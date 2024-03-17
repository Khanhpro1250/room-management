using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.Models.Repositorties.UserAccountRepositories.RoleRepositories;
using backend.Services.RoleServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.UserServices;

public class UserService : IUserService
{
    private readonly IUserAccountRepository _userAccountRepository;
    private readonly IRoleService _roleService;
    private readonly IRoleRepository _roleRepository;
    private readonly IMapper _mapper;


    public UserService(IUserAccountRepository userAccountRepository, IMapper mapper, IRoleService roleService,
        IRoleRepository roleRepository)
    {
        _userAccountRepository = userAccountRepository;
        _mapper = mapper;
        _roleService = roleService;
        _roleRepository = roleRepository;
    }

    public async Task<PaginatedList<UserDto>> GetListUser(PaginatedListQuery paginatedListQuery)
    {
        var queryable = _userAccountRepository.GetQueryable();
        var result = await queryable
            .Include(x => x.UserRoles)
            .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            .QueryablePaging(paginatedListQuery)
            .ToListAsync();
        return new PaginatedList<UserDto>(result, result.Count, paginatedListQuery.Limit, paginatedListQuery.Offset);
    }

    public async Task<UserDto> GetUserById(Guid userId)
    {
        var user = await _userAccountRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(userId));
        var result = _mapper.Map<User, UserDto>(user);
        return result;
    }

    public async Task<User> GetUserByUserNameOrEmail(string userName)
    {
        var user = await _userAccountRepository.GetQueryable()
            .FirstOrDefaultAsync(x => x.UserName.ToLower().Contains(userName.ToLower()) || 
                                      x.EmailAddress.ToLower().Contains(userName.ToLower()));
        return user;
    }

    public async Task<UserDto> CreateUser(CreateUpdateUserDtos user)
    {
        var userEntity = _mapper.Map<CreateUpdateUserDtos, User>(user);
        var result = await _userAccountRepository.CreateUser(userEntity);
        if (!user.IsAdmin)
        {
            var roleQueryable = _roleRepository.GetQueryable();
            var roleUser = await roleQueryable
                .AsNoTracking()
                .Include(x => x.UserRole)
                .FirstOrDefaultAsync(x => x.Code.Contains("ROOM_OWNER"));
            if (roleUser is not null)
            {
                roleUser.UserRole.Add(new UserRole()
                {
                    RoleId = roleUser.Id,
                    UserId = result.Id
                });
                await _roleRepository.UpdateAsync(roleUser, true);
            }
        }

        return _mapper.Map<User, UserDto>(result);
    }

    public async Task<UserDto> UpdateUser(CreateUpdateUserDtos user, Guid id)
    {
        var findUser =
            await _userAccountRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
            throw new Exception("User không tồn tại");
        var userEntity = _mapper.Map<CreateUpdateUserDtos, User>(user, findUser);
        var result = await _userAccountRepository.UpdateAsync(userEntity, true);
        return _mapper.Map<User, UserDto>(result);
    }

    public async Task UpdateUserProfile(UpdateUserProfileDto user)
    {
        var findUser = await _userAccountRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(user.Id)) ??
                       throw new Exception("User không tồn tại");
        var userEntity = _mapper.Map<UpdateUserProfileDto, User>(user, findUser);
        await _userAccountRepository.UpdateAsync(userEntity, true);
    }

    public async Task<UserDto> RegisterUser(CreateUpdateUserDtos user)
    {
        var userEntity = _mapper.Map<CreateUpdateUserDtos, User>(user);
        var passWordHash = PasswordHasher.HashPassword(user.Password.ToLower());
        userEntity.PasswordHash = passWordHash;
        var result = await _userAccountRepository.CreateUser(userEntity);
        if (!user.IsAdmin)
        {
            var roleQueryable = _roleRepository.GetQueryable();
            var roleUser = await roleQueryable
                .Include(x => x.UserRole)
                .FirstOrDefaultAsync(x => x.Code.Contains("ROOM_OWNER"));
            if (roleUser is not null)
            {
                if (roleUser.UserRole is not null && roleUser.UserRole.Any())
                {
                    roleUser.UserRole.Add(new UserRole()
                    {
                        RoleId = roleUser.Id,
                        UserId = result.Id
                    });
                }
                else
                {
                    roleUser.UserRole = new List<UserRole>()
                    {
                        new UserRole()
                        {
                            RoleId = roleUser.Id,
                            UserId = result.Id
                        }
                    };
                }

                await _roleRepository.UpdateAsync(roleUser, true);
            }
        }

        return _mapper.Map<User, UserDto>(result);
    }

    public async Task ChangePassWord(ChangePasswordDto request)
    {
        var user = await _userAccountRepository.GetQueryable()
                       .FirstOrDefaultAsync(x => x.EmailAddress.Contains(request.Email.ToLower())) ??
                   throw new Exception("User không tồn tại");
        var passWordHash = PasswordHasher.HashPassword(request.Password.ToLower());
        user.PasswordHash = passWordHash;
        await _userAccountRepository.UpdateAsync(user, true);
    }

    public async Task DeleteUser(Guid id)
    {
        var findUser =
            await _userAccountRepository.GetQueryable().AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
            throw new Exception("User không tồn tại");
        await _userAccountRepository.DeleteAsync(findUser, true);
    }

    public async Task<bool> IsValidUserRegister(CreateUpdateUserDtos userDtos)
    {
        var queryable = _userAccountRepository.GetQueryable();
        var findUser = await queryable
            .FirstOrDefaultAsync(x =>
                x.UserName.Contains(userDtos.UserName.ToLower()) ||
                x.EmailAddress.Contains(userDtos.EmailAddress.ToLower()));
        return findUser == null;
    }

    public async Task<bool> IsEmailRegister(string email)
    {
        var queryable = _userAccountRepository.GetQueryable();
        var findUser = await queryable
            .FirstOrDefaultAsync(x => x.EmailAddress.Contains(email.ToLower()));
        return findUser is not null;
    }


    public async Task<List<ComboOptionKeyTitleDto>> GetComboUser()
    {
        var queryable = _userAccountRepository.GetQueryable();
        var result = await queryable.Select(x => new ComboOptionKeyTitleDto()
        {
            Key = x.Id,
            Title = $"{x.UserCode} - {x.FullName}"
        }).ToListAsync();

        return result;
    }
}