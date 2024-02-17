using backend.Models.Entities.Customers;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.CustomerRepositories
{
    public class CustomerRepository : EfCoreRepository<ApplicationDbContext, Customer>, ICustomerRepository
    {
        private readonly ApplicationDbContext _context;

        public CustomerRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
            serviceProvider, context)
        {
            _context = context;
        }

        public DbSet<Customer> GetRepository()
        {
            return _context.Set<Customer>();
        }

        public IQueryable<Customer> GetQueryable()
        {
            return GetRepository().AsQueryable();
        }
    }
}