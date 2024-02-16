using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public interface IRoomProcessRepository : IRepository<RoomProcess>
{
    DbSet<RoomProcess> GetRepository();
    IQueryable<RoomProcess> GetQueryable();
}