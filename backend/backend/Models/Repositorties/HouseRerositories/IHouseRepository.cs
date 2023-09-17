using backend.Models.Entities.Houses;

namespace backend.Models.Repositorties.HouseRerositories;

public interface IHouseRepository
{
    Task<House> CreateHouse(House house);
}