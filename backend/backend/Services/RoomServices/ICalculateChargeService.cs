using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;

namespace backend.Services.RoomServices;

public interface ICalculateChargeService
{
    Task<PaginatedList<CalculateChargeGridDto>> GetListCalculateCharge(CalculateChargeFilterDto filterDto);

    Task DeleteCalculateCharge(Guid id);

    Task CalculateChargeRooms(CalculateRoomRequestDto calculateRoomRequestDto);

    Task UpdateCalculateCharge(UpdateCalculateChargeDto calculateChargeDto);
    Task<CalculateChargeDto> GetDetailCalculateCharge(Guid id);
}