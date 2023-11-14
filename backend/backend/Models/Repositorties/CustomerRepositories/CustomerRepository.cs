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
        // private readonly IMongoCollection<Customer> _customer;
        // public CustomerRepository(IMongoClient client, string databaseName)
        // {
        //     IMongoDatabase database = client.GetDatabase(databaseName);
        //     _customer = database.GetCollection<Customer>("Customer");
        // }
        //
        // public async Task<List<Customer>> GetListCustomer()
        // {
        //     return await _customer.Find(item => true).ToListAsync();
        // }
        //
        // public async Task<Customer> GetCustomerById(string customerId)
        // {
        //     var result = await _customer.Find(x => x.Id == customerId).FirstOrDefaultAsync();
        //
        //     return result ?? new Customer();
        // }
        //
        // public async Task<Customer> CreateCustomer(Customer customer)
        // {
        //     await _customer.InsertOneAsync(customer);
        //     return customer;
        // }
        //
        // public async Task<Customer> UpdateCustomer(Customer customer, string customerId)
        // {
        //     var filter = Builders<Customer>.Filter.Eq(x => x.Id, customerId);
        //     await _customer.ReplaceOneAsync(filter, customer);
        //     return customer;
        // }
        //
        // public async Task DeleteCustomer(string id)
        // {
        //     var filter = Builders<Customer>.Filter.Eq(x => x.Id, id);
        //     await _customer.DeleteOneAsync(filter);
        // }
        //
        // public IMongoCollection<Customer> GetQueryable()
        // {
        //     return _customer;
        // }
    }
}