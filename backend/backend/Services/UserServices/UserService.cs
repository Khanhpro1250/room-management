﻿using AutoMapper;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.Utils;
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

    public async Task<PaginatedList<UserDto>> GetListUser()
    {
        var queryable = _userAccountRepository.GetQueryable();
        var listUser = await queryable.Find(x => true).ToListAsync();
        var result = _mapper.Map<List<User>, List<UserDto>>(listUser);
        return new PaginatedList<UserDto>(result, result.Count, 0, 10);
    }

    public async Task<UserDto> GetUserById(string userId)
    {
        var user = await _userAccountRepository.GetUserById(userId);
        var result = _mapper.Map<User, UserDto>(user);
        return result;
    }

    public async Task<User> GetUserByUserName(string userName)
    {
        var user = await _userAccountRepository.GetUserByUserName(userName);
        return user;
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

    public async Task<UserDto> RegisterUser(CreateUpdateUserDtos user)
    {
        var userEntity = _mapper.Map<CreateUpdateUserDtos, User>(user);
        var passWordHash = PasswordHasher.HashPassword(user.Password);
        userEntity.PasswordHash = passWordHash;
        var result = await _userAccountRepository.CreateUser(userEntity);
        return _mapper.Map<User, UserDto>(result);
    }

    public async Task<bool> IsValidUserRegister(CreateUpdateUserDtos userDtos)
    {
        var queryable = _userAccountRepository.GetQueryable();
        var findUser = await queryable
            .Find(x => x.UserName.Contains(userDtos.UserName) || x.EmailAddress.Contains(userDtos.EmailAddress))
            .FirstOrDefaultAsync();
        return findUser == null;
    }
    


    public async Task<List<ComboOptionKeyTitleDto>> GetComboUser()
    {
        var queryable = _userAccountRepository.GetQueryable();
        var listUser = await queryable.Find(x => true).ToListAsync();
        var result = listUser.Select(x => new ComboOptionKeyTitleDto()
        {
            Key = x.Id,
            Title = $"{x.UserCode} - {x.FullName}"
        }).ToList();
        return result;
    }
}