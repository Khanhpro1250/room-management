using backend.Models.Entities.Contracts;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.ContractRepositories
{
    public class ContractRepository : EfCoreRepository<ApplicationDbContext, Contract>, IContractRepository
    {
        private readonly ApplicationDbContext _context;

        public ContractRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
            serviceProvider, context)
        {
            _context = context;
        }

        public DbSet<Contract> GetRepository()
        {
            return _context.Set<Contract>();
        }

        public IQueryable<Contract> GetQueryable()
        {
            return GetRepository().AsQueryable();
        }
    }
}