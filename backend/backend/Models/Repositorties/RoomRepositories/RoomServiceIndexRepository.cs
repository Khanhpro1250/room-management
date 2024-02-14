using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public class RoomServiceIndexRepository : EfCoreRepository<ApplicationDbContext, RoomServiceIndex>,
    IRoomServiceIndexRepository
{
    private readonly ApplicationDbContext _context;

    public RoomServiceIndexRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
        serviceProvider, context)
    {
        _context = context;
    }

    public DbSet<RoomServiceIndex> GetRepository()
    {
        return _context.Set<RoomServiceIndex>();
    }

    public IQueryable<RoomServiceIndex> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}