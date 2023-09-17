using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Services.UserServices;

public class UserService : IUserService
{
    private readonly IUserAccountRepository _userAccountRepository;
    private readonly IMapper _mapper;


    public UserService(IUserAccountRepository userAccountRepository, IMapper mapper)
    {
        _userAccountRepository = userAccountRepository;
        _mapper = mapper;
    }

    public async Task<List<UserDto>> GetListUser()
    {
        var listUser = await _userAccountRepository.GetListUser();
        var result = _mapper.Map<List<User>, List<UserDto>>(listUser);
        return result;
    }

    public async Task<UserDto> GetUserById(string userId)
    {
        var user = await _userAccountRepository.GetUserById(userId);
        var result = _mapper.Map<User, UserDto>(user);
        return result;
    }

    public async Task<UserDto> CreateUser(CreateUpdateUserDtos user)
    {
        var userEntity = _mapper.Map<CreateUpdateUserDtos, User>(user);
        var result = await _userAccountRepository.CreateUser(userEntity);
        return _mapper.Map<User, UserDto>(result);
    }

    public async Task<UserDto> UpdateUser(CreateUpdateUserDtos user, string id)
    {
        var userEntity = _mapper.Map<CreateUpdateUserDtos, User>(user);
        var result = await _userAccountRepository.UpdateUser(userEntity, id);
        return _mapper.Map<User, UserDto>(result);
    }

    public async Task DeleteMenu(string id)
    {
        await _userAccountRepository.DeleteMenu(id);
    }
}