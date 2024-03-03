using backend.Models.Entities.Customers;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.CustomerRepositories;

public class PaymentHistoryRepository : EfCoreRepository<ApplicationDbContext, PaymentHistory>,
    IPaymentHistoryRepository
{
    private readonly ApplicationDbContext _context;

    public PaymentHistoryRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
        serviceProvider, context)
    {
        _context = context;
    }

    public DbSet<PaymentHistory> GetRepository()
    {
        return _context.Set<PaymentHistory>();
    }

    public IQueryable<PaymentHistory> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}