using backend.Models.Entities.Customers;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.CustomerRepositories
{
    public interface ICustomerRepository : IRepository<Customer>
    {
       
        DbSet<Customer> GetRepository();
        IQueryable<Customer> GetQueryable();
    }
}