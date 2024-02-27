using backend.Models.Entities.Deposits;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.DepositRepositories;
public class DepositRepository : EfCoreRepository<ApplicationDbContext, Deposit>, IDepositRepository
{
    private readonly ApplicationDbContext _context;

    public DepositRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
        serviceProvider, context)
    {
        _context = context;
    }

    public DbSet<Deposit> GetRepository()
    {
        return _context.Set<Deposit>();
    }

    public IQueryable<Deposit> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}