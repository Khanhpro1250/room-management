using backend.Models.Entities.Deposits;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.DepositRepositories;

public interface IDepositRepository: IRepository<Deposit>
{
       
    DbSet<Deposit> GetRepository();
    IQueryable<Deposit> GetQueryable();
}