using backend.Models.Entities.Houses;
using MongoDB.Driver;

namespace backend.Models.Repositorties.HouseRerositories;

public class HouseRepository : IHouseRepository
{
    private readonly IMongoCollection<House> _house;

    public HouseRepository(IMongoClient client, string databaseName)
    {
        IMongoDatabase database = client.GetDatabase(databaseName);
        _house = database.GetCollection<House>("House");
    }

    public async Task<House> CreateHouse(House house)
    {
        await _house.InsertOneAsync(house);
        return house;
    }

    public async Task<House> UpdateHouse(House house, string id)
    {
        var filter = Builders<House>.Filter.Eq(x => x.Id, id);
        await _house.ReplaceOneAsync(filter, house);
        return house;
    }

    public async Task DeleteHouse(string id)
    {
        var filter = Builders<House>.Filter.Eq(x => x.Id, id);
        await _house.DeleteOneAsync(filter);
    }

    public IMongoCollection<House> GetQueryable()
    {
        return _house;
    }
}