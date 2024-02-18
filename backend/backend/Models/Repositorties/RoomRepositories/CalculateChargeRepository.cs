using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public class CalculateChargeRepository : EfCoreRepository<ApplicationDbContext, CalculateCharge>,
    ICalculateChargeRepository
{
    private readonly ApplicationDbContext _context;

    public CalculateChargeRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
        serviceProvider, context)
    {
        _context = context;
    }

    public DbSet<CalculateCharge> GetRepository()
    {
        return _context.Set<CalculateCharge>();
    }

    public IQueryable<CalculateCharge> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}