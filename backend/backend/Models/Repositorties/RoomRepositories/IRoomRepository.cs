using backend.DTOs.RoomDtos;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.RoomRepositories
{
    public interface IRoomRepository : IRepository<Room>
    {
        // Task<List<Room>> GetListRoom();
        // Task<Room> GetRoomById(string roomId);
        // Task<Room> CreateRoom(Room room);
        // Task<Room> UpdateRoom(Room room, string id);
        // IMongoCollection<Room> GetQueryable();
        //
        // Task DeleteRoom(string id);

        DbSet<Room> GetRepository();
        IQueryable<Room> GetQueryable();
    }
}