using backend.Models.Entities.Houses;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.HouseRerositories;

public class HouseRepository :EfCoreRepository<ApplicationDbContext,House>, IHouseRepository
{
    private readonly ApplicationDbContext _context;
    public HouseRepository(IServiceProvider serviceProvider ,ApplicationDbContext context) : base(serviceProvider, context)
    {
        _context = context;
    }

    public DbSet<House> GetRepository()
    {
        return _context.Set<House>();
    }

    public IQueryable<House> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}