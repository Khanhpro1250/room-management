using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;

namespace backend.Services.RoomServices
{
    public interface IRoomService
    {
        Task<PaginatedList<RoomDto>> GetListRoom(RoomFilterDto filterDto);
        Task<RoomDto> GetRoomById(string roomId);
        Task<DataWithRoomDto> GetDataWithRoom(string roomId);
        Task<RoomDto> CreateRoom(CreateUpdateRoomDto room);
        Task<RoomDto> UpdateRoom(CreateUpdateRoomDto room, string id);
        Task DeleteRoom(string id);
    }
}