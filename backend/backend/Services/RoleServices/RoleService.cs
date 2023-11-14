using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories.RoleRepositories;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Services.RoleServices
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRopository;
        private readonly IMapper _mapper;

        private readonly ICurrentUser _currentUser;

        //
        public RoleService(IRoleRepository roleRepository, IMapper mapper, ICurrentUser currentUser)
        {
            _roleRopository = roleRepository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<RoleDto> CreateRole(CreateUpdateRoleDto role)
        {
            var roleEntity = _mapper.Map<CreateUpdateRoleDto, Role>(role);
            var result = await _roleRopository.AddAsync(roleEntity, true);
            return _mapper.Map<Role, RoleDto>(result);
        }

        public async Task DeleteRole(Guid id)
        {
            var findRole =
                await _roleRopository.GetQueryable().AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                throw new Exception("Không tìm thấy role");
            await _roleRopository.DeleteAsync(findRole, true);
        }

        public async Task<List<Guid>> GetPermissionWithCurrentUser()
        {
            var currentUserId = _currentUser.Id;
            var queryable = _roleRopository.GetQueryable();
            var listRoleIds = await queryable
                .SelectMany(x => x.UserRole)
                .Where(x => x.UserId.Equals(currentUserId))
                .Select(x => x.RoleId)
                .ToListAsync();
            return listRoleIds;
        }


        public async Task<RoleDto> GetRoleById(Guid roleId)
        {
            var role = await _roleRopository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(roleId));
            var result = _mapper.Map<Role, RoleDto>(role);
            return result;
        }

        public async Task<RoleDto> UpdateRole(CreateUpdateRoleDto role, string id)
        {
            var findRole =
                await _roleRopository.GetQueryable().AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                throw new Exception("Không tìm thấy role");

            var roleEntity = _mapper.Map<CreateUpdateRoleDto, Role>(role);
            var result = await _roleRopository.UpdateAsync(roleEntity, true);
            return _mapper.Map<Role, RoleDto>(result);
        }

        public async Task<RoleDto> UpdateRoleUser(UpdateUserRoleDto userRoleDto)
        {
            var role = await _roleRopository.GetQueryable()
                           .Include(x => x.UserRole)
                           .FirstOrDefaultAsync(x => x.Id.Equals(userRoleDto.RoleId)) ??
                       throw new Exception("Không tìm thấy role");
            var listUserRole = new List<UserRole>();
            foreach (var userId in userRoleDto.UserIds)
            {
                listUserRole.Add(new UserRole()
                {
                    RoleId = role.Id,
                    UserId = userId
                });
            }

            role.UserRole = listUserRole;

            var result = await _roleRopository.UpdateAsync(role, true);
            return _mapper.Map<Role, RoleDto>(result);
        }

        public async Task<List<ComboOptionDto>> GetComboRole()
        {
            var queryable = _roleRopository.GetQueryable();
            var result = await queryable.Select(x => new ComboOptionDto()
                {
                    Value = x.Id,
                    Label = x.Name
                })
                .ToListAsync();

            return result;
        }

        public async Task<PaginatedList<RoleDto>> GetListRole(PaginatedListQuery paginatedListQuery)
        {
            var queryable = _roleRopository.GetQueryable();
            var count = await queryable.CountAsync();
            var result = await queryable
                .Include(x => x.UserRole)
                .Select(x => new RoleDto
                {
                    Id = x.Id,
                    CreatedBy = x.CreatedBy,
                    CreatedTime = x.CreatedTime,
                    LastModifiedBy = x.LastModifiedBy,
                    LastModifiedTime = x.LastModifiedTime,
                    Name = x.Name,
                    Code = x.Code,
                    UserIds = x.UserRole.Select(y => y.UserId.ToString().ToLower()).ToList()
                })
                .QueryablePaging(paginatedListQuery)
                .ToListAsync();

            return new PaginatedList<RoleDto>(result, count, paginatedListQuery.Offset, paginatedListQuery.Limit);
        }
    }
}