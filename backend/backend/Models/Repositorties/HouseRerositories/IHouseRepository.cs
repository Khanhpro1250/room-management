using backend.Models.Entities.Houses;
using MongoDB.Driver;

namespace backend.Models.Repositorties.HouseRerositories;

public interface IHouseRepository
{
    Task<House> CreateHouse(House house);
    Task<House> UpdateHouse(House house, string id);

    public Task DeleteHouse(string id);
    IMongoCollection<House> GetQueryable();
}