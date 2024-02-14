using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.UserAccountRepositories;

public interface IUserAccountRepository : IRepository<User>
{
    Task<List<User>> GetListUser();
    DbSet<User> GetRepository();
    IQueryable<User> GetQueryable();
    // Task<User> GetUserById(string userId);
    // Task<User> GetUserByUserName(string userName);
    Task<User> CreateUser(User user);
    Task<User> UpdateUser(User user,Guid userId);
    // IMongoCollection<User> GetQueryable();
    //
    // Task DeleteUser(string id);
}