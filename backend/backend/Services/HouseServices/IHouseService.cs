using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.HouseDtos;

namespace backend.Services.HouseServices;

public interface IHouseService
{
    Task<HouseDto> CreateHouse(CreateUpdateHouseDto houseDto);
    Task<HouseDto> UpdateHouse(CreateUpdateHouseDto houseDto, Guid id);
    
    Task DeleteHouse(Guid id);
    Task<PaginatedList<HouseDto>> GetListHouse(PaginatedListQuery paginatedListQuery);
    Task<List<ComboOptionDto>> GetComboHouse(bool isByCurrentUserId = false);
}