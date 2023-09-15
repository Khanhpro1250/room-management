using backend.Controllers;
using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.UserAccountRepositories;

public class UserAccountRepository : IUserAccountRepository
{
    private readonly IMongoCollection<User> _user;

    public UserAccountRepository(IMongoClient client, string databaseName)
    {
        IMongoDatabase database = client.GetDatabase(databaseName);
        _user = database.GetCollection<User>("User");
    }

    public async Task<List<User>> GetListUser()
    {
        return await _user.Find(item => true).ToListAsync();
    }

    public async Task<User> GetListUserById(string userId)
    {
        var result = await _user.AsQueryable().Where(x => x.Id == userId).FirstOrDefaultAsync();
        return result ?? new User();
    }

    public async Task<User> CreateUser(test test)
    {
        var user = new User()
        {
            Name = test.Name
        };
        await _user.InsertOneAsync(user);
        return user;
    }
}