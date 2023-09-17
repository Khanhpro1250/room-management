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
}