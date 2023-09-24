using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.HouseDtos;
using backend.DTOs.MenuDtos;

namespace backend.Services.HouseServices;

public interface IHouseService
{
    Task<HouseDto> CreateHouse(CreateUpdateHouseDto houseDto);
    Task<PaginatedList<HouseDto>> GetListHouse();
    Task<List<ComboOptionDto>> GetComboHouse();
}