using backend.DTOs.HouseDtos;
using backend.DTOs.MenuDtos;

namespace backend.Services.HouseServices;

public interface IHouseService
{
    Task<HouseDto> CreateHouse(CreateUpdateHouseDto houseDto);
}