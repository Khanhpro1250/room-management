using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.HouseDtos;

namespace backend.Services.HouseServices;

public interface IHouseService
{
    Task<HouseDto> CreateHouse(CreateUpdateHouseDto houseDto);
    Task<HouseDto> UpdateHouse(CreateUpdateHouseDto houseDto, string id);

    Task DeleteHouse(string id);
    Task<PaginatedList<HouseDto>> GetListHouse();
    Task<List<ComboOptionDto>> GetComboHouse();
}