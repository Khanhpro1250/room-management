using backend.Models.Entities.Houses;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.HouseRerositories;

public interface IHouseRepository: IRepository<House>
{
    // Task<House> CreateHouse(House house);
    // Task<House> UpdateHouse(House house, string id);
    //
    // public Task DeleteHouse(string id);
    // IMongoCollection<House> GetQueryable();
    
    DbSet<House> GetRepository();
    IQueryable<House> GetQueryable();
}