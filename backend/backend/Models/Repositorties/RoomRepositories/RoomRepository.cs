using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public class RoomRepository : EfCoreRepository<ApplicationDbContext, Room>, IRoomRepository
{
    private readonly ApplicationDbContext _context;

    public RoomRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
        serviceProvider, context)
    {
        _context = context;
    }
  
    public DbSet<Room> GetRepository()
    {
        return _context.Set<Room>();
    }

    public IQueryable<Room> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}