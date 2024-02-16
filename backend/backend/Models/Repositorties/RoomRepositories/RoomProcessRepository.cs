using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public class RoomProcessRepository : EfCoreRepository<ApplicationDbContext, RoomProcess>, IRoomProcessRepository
{
    private readonly ApplicationDbContext _context;

    public RoomProcessRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(serviceProvider,
        context)
    {
        _context = context;
    }

    public DbSet<RoomProcess> GetRepository()
    {
        return _context.Set<RoomProcess>();
    }

    public IQueryable<RoomProcess> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}