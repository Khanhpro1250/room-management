using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public interface ICalculateChargeRepository : IRepository<CalculateCharge>
{
    DbSet<CalculateCharge> GetRepository();
    IQueryable<CalculateCharge> GetQueryable();
}