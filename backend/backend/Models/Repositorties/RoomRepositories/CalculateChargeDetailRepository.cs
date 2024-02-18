using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public class CalculateChargeDetailRepository : EfCoreRepository<ApplicationDbContext, CalculateChargeDetail>,
    ICalculateChargeDetailRepository
{
    private readonly ApplicationDbContext _context;

    public CalculateChargeDetailRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
        serviceProvider, context)
    {
        _context = context;
    }

    public DbSet<CalculateChargeDetail> GetRepository()
    {
        return _context.Set<CalculateChargeDetail>();
    }

    public IQueryable<CalculateChargeDetail> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}