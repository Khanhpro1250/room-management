using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public interface IRoomServiceIndexRepository : IRepository<RoomServiceIndex>
{
    DbSet<RoomServiceIndex> GetRepository();
    IQueryable<RoomServiceIndex> GetQueryable();
}