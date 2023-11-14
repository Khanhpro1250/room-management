using backend.Models.Entities.Houses;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.HouseRerositories;

public class HouseRepository :EfCoreRepository<ApplicationDbContext,House>, IHouseRepository
{
    private readonly ApplicationDbContext _context;
    public HouseRepository(IServiceProvider serviceProvider ,ApplicationDbContext context) : base(serviceProvider, context)
    {
        _context = context;
    }
    // private readonly IMongoCollection<House> _house;
    //
    // public HouseRepository(IMongoClient client, string databaseName)
    // {
    //     IMongoDatabase database = client.GetDatabase(databaseName);
    //     _house = database.GetCollection<House>("House");
    // }
    //
    // public async Task<House> CreateHouse(House house)
    // {
    //     await _house.InsertOneAsync(house);
    //     return house;
    // }
    //
    // public async Task<House> UpdateHouse(House house, string id)
    // {
    //     var filter = Builders<House>.Filter.Eq(x => x.Id, id);
    //     await _house.ReplaceOneAsync(filter, house);
    //     return house;
    // }
    //
    // public async Task DeleteHouse(string id)
    // {
    //     var filter = Builders<House>.Filter.Eq(x => x.Id, id);
    //     await _house.DeleteOneAsync(filter);
    // }
    //
    // public IMongoCollection<House> GetQueryable()
    // {
    //     return _house;
    // }

    public DbSet<House> GetRepository()
    {
        return _context.Set<House>();
    }

    public IQueryable<House> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}