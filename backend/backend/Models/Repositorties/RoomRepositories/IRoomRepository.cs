using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories
{
    public interface IRoomRepository : IRepository<Room>
    {
        DbSet<Room> GetRepository();
        IQueryable<Room> GetQueryable();
    }
}