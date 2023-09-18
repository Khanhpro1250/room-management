using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;
using MongoDB.Driver;

namespace backend.Models.Repositorties.CustomerRepositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly IMongoCollection<Customer> _customer;
        public CustomerRepository(IMongoClient client, string databaseName)
        {
            IMongoDatabase database = client.GetDatabase(databaseName);
            _customer = database.GetCollection<Customer>("Customer");
        }

        public async Task<List<Customer>> GetListCustomer()
        {
            return await _customer.Find(item => true).ToListAsync();
        }

        public async Task<Customer> GetCustomerById(string customerId)
        {
            var result = await _customer.Find(x => x.Id == customerId).FirstOrDefaultAsync();

            return result ?? new Customer();
        }

        public async Task<Customer> CreateCustomer(Customer customer)
        {
            await _customer.InsertOneAsync(customer);
            return customer;
        }

        public async Task<Customer> UpdateCustomer(Customer customer, string customerId)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, customerId);
            await _customer.ReplaceOneAsync(filter, customer);
            return customer;
        }

        public async Task DeleteCustomer(string id)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, id);
            await _customer.DeleteOneAsync(filter);
        }

        public IMongoCollection<Customer> GetQueryable()
        {
            return _customer;
        }
    }
}
