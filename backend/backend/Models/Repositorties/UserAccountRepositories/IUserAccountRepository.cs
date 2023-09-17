﻿using backend.Models.Entities.UserAccount;
using MongoDB.Driver;

namespace backend.Models.Repositorties.UserAccountRepositories;

public interface IUserAccountRepository
{
    Task<List<User>> GetListUser();
    Task<User> GetUserById(string userId);
    Task<User> CreateUser(User user);
    Task<User> UpdateUser(User user,string userId);
    IMongoCollection<User> GetQueryable();

    Task DeleteMenu(string id);
}