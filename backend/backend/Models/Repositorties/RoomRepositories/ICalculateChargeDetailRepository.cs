using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public interface ICalculateChargeDetailRepository : IRepository<CalculateChargeDetail>
{
    DbSet<CalculateChargeDetail> GetRepository();
    IQueryable<CalculateChargeDetail> GetQueryable();
}