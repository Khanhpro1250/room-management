using backend.Models.Entities.Customers;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.CustomerRepositories
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        // Task<List<Customer>> GetListCustomer();
        // Task<Customer> GetCustomerById(string customerId);
        // Task<Customer> CreateCustomer(Customer customer);
        // Task<Customer> UpdateCustomer(Customer customer, string id);
        // IMongoCollection<Customer> GetQueryable();
        // Task DeleteCustomer(string id);
        DbSet<Customer> GetRepository();
        IQueryable<Customer> GetQueryable();
    }
}