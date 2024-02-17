using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public class IncurredCostRepository : EfCoreRepository<ApplicationDbContext, IncurredCost>, IIncurredCostRepository
{
    private readonly ApplicationDbContext _context;

    public IncurredCostRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
        serviceProvider, context)
    {
        _context = context;
    }

    public DbSet<IncurredCost> GetRepository()
    {
        return _context.Set<IncurredCost>();
    }

    public IQueryable<IncurredCost> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}