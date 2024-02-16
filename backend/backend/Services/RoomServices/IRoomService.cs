using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;

namespace backend.Services.RoomServices
{
    public interface IRoomService
    {
        Task<PaginatedList<RoomDto>> GetListRoom(RoomFiterDto filterDto);
        Task<RoomDto> GetRoomById(Guid roomId);
        Task<DataWithRoomDto> GetDataWithRoom(Guid roomId);
        Task<RoomDto> CreateRoom(CreateUpdateRoomDto room);
        Task<RoomDto> UpdateRoom(CreateUpdateRoomDto room, Guid id);
        Task UpdateServiceIndex(RoomServiceIndexCreateUpdateDto updateDto);

        Task<PaginatedList<RoomElectricServiceDto>> GetElectricServiceRoom(ElectricServiceFilterDto filterDto);
        Task DeleteRoom(Guid id);
        
        Task ReturnRoom(Guid id);
    }
}