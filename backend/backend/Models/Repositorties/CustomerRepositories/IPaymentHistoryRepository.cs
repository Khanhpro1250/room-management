using backend.Models.Entities.Customers;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.CustomerRepositories;

public interface IPaymentHistoryRepository : IRepository<PaymentHistory>
{
    DbSet<PaymentHistory> GetRepository();
    IQueryable<PaymentHistory> GetQueryable();
}