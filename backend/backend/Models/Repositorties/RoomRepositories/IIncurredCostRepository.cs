using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public interface IIncurredCostRepository : IRepository<IncurredCost>
{
    DbSet<IncurredCost> GetRepository();
    IQueryable<IncurredCost> GetQueryable();
}