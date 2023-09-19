using backend.Models.Entities.UserAccount;
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

    public async Task<User> GetUserById(string userId)
    {
        var result = await _user.Find(x => x.Id == userId).FirstOrDefaultAsync();

        return result ?? new User();
    }

    public async Task<User> GetUserByUserName(string userName)
    {
        var result = await _user.Find(x => x.UserName == userName).FirstOrDefaultAsync();

        return result ?? new User();
    }

    public async Task<User> CreateUser(User user)
    {
        await _user.InsertOneAsync(user);
        return user;
    }

    public async Task<User> UpdateUser(User user, string userId)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
        await _user.ReplaceOneAsync(filter, user);
        return user;
    }

    public async Task DeleteMenu(string id)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Id, id);
        await _user.DeleteOneAsync(filter);
    }

    public IMongoCollection<User> GetQueryable()
    {
        return _user;
    }
}