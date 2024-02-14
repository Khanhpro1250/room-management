using System.Runtime.CompilerServices;
using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.UserAccountRepositories;

public class UserAccountRepository : EfCoreRepository<ApplicationDbContext, User>, IUserAccountRepository
{
    private readonly ApplicationDbContext _context;
    public UserAccountRepository(IServiceProvider serviceProvider, ApplicationDbContext applicationDbContext) : base(serviceProvider, applicationDbContext)
    {
        _context = applicationDbContext;
    }
  
    public DbSet<User> GetRepository()
    {
        return _context.Set<User>();
    }

    public IQueryable<User> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }

    // private readonly IMongoCollection<User> _user;
    //
    //
    // public UserAccountRepository(IMongoClient client, string databaseName)
    // {
    //     IMongoDatabase database = client.GetDatabase(databaseName);
    //     _user = database.GetCollection<User>("User");
    // }
    //
    // public async Task<List<User>> GetListUser()
    // {
    //     return await _user.Find(item => true).ToListAsync();
    // }
    //
    // public async Task<User> GetUserById(string userId)
    // {
    //     var result = await _user.Find(x => x.Id == userId).FirstOrDefaultAsync();
    //
    //     return result ?? new User();
    // }
    //
    // public async Task<User> GetUserByUserName(string userName)
    // {
    //     var result = await _user.Find(x => x.UserName == userName).FirstOrDefaultAsync();
    //
    //     return result ?? new User();
    // }
    //
    // public async Task<User> CreateUser(User user)
    // {
    //     await _user.InsertOneAsync(user);
    //     return user;
    // }
    //
    // public async Task<User> UpdateUser(User user, string userId)
    // {
    //     var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
    //     await _user.ReplaceOneAsync(filter, user);
    //     return user;
    // }
    //
    // public async Task DeleteUser(string id)
    // {
    //     var filter = Builders<User>.Filter.Eq(x => x.Id, id);
    //     await _user.DeleteOneAsync(filter);
    // }
    //
    // public IMongoCollection<User> GetQueryable()
    // {
    //     return _user;
    // }
    public async Task<User> CreateUser(User user)
    {
        var repository = GetRepository();
        await repository.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateUser(User user, Guid userId)
    {
        var repository = GetRepository();
        repository.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public  Task<List<User>> GetListUser()
    {
        return GetQueryable().Where(x => x.IsAdmin == false).ToListAsync();
    }
}