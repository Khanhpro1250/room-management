using backend.Models.Entities.Services;
using MongoDB.Driver;

namespace backend.Models.Repositorties.ServiceRepositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly IMongoCollection<Service> _service;
        public ServiceRepository(IMongoClient client, string databaseName)
        {
            IMongoDatabase database = client.GetDatabase(databaseName);
            _service = database.GetCollection<Service>("Service");
        }

        public async Task<List<Service>> GetListService()
        {
            return await _service.Find(item => true).ToListAsync();
        }

        public async Task<Service> GetServiceById(string serviceId)
        {
            var result = await _service.Find(x => x.Id == serviceId).FirstOrDefaultAsync();

            return result ?? new Service();
        }

        public async Task<Service> CreateService(Service service)
        {
            await _service.InsertOneAsync(service);
            return service;
        }

        public async Task<Service> UpdateService(Service service, string serviceId)
        {
            var filter = Builders<Service>.Filter.Eq(x => x.Id, serviceId);
            await _service.ReplaceOneAsync(filter, service);
            return service;
        }

        public async Task DeleteService(string id)
        {
            var filter = Builders<Service>.Filter.Eq(x => x.Id, id);
            await _service.DeleteOneAsync(filter);
        }

        public IMongoCollection<Service> GetQueryable()
        {
            return _service;
        }
    }
}
