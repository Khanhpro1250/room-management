using backend.DTOs.RoomDtos;

namespace backend.Services.RoomServices
{
    public interface IRoomService
    {
        Task<List<RoomDto>> GetListRoom();
        Task<RoomDto> GetRoomById(string roomId);
        Task<RoomDto> CreateRoom(CreateUpdateRoomDto room);
        Task<RoomDto> UpdateRoom(CreateUpdateRoomDto room, string id );
        Task DeleteRoom(string id);
    }
}
