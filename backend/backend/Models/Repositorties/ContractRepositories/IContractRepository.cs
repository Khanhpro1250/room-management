using backend.Models.Entities.Contracts;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.ContractRepositories
{
    public interface IContractRepository: IRepository<Contract>
    {
        DbSet<Contract> GetRepository();
        IQueryable<Contract> GetQueryable();
    }
}
