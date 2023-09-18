using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;
using MongoDB.Driver;

namespace backend.Models.Repositorties.CustomerRepositories
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetListCustomer();
        Task<Customer> GetCustomerById(string customerId);
        Task<Customer> CreateCustomer(Customer customer);
        Task<Customer> UpdateCustomer(Customer customer, string id);
        IMongoCollection<Customer> GetQueryable();
        Task DeleteCustomer(string id);
    }
}
