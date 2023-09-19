using backend.Models.Entities.Services;
using MongoDB.Driver;

namespace backend.Models.Repositorties.ServiceRepositories
{
    public interface IServiceRepository
    {
        Task<List<Service>> GetListService();
        Task<Service> GetServiceById(string serviceId);
        Task<Service> CreateService(Service service);
        Task<Service> UpdateService(Service service, string id);
        IMongoCollection<Service> GetQueryable();
        Task DeleteService(string id);
    }
}
