using backend.Models.Entities.Services;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.ServiceRepositories
{
    public interface IServiceRepository : IRepository<Service>
    {
        // Task<List<Service>> GetListService();
        // Task<Service> GetServiceById(string serviceId);
        // Task<Service> CreateService(Service service);
        // Task<Service> UpdateService(Service service, string id);
        // IMongoCollection<Service> GetQueryable();
        // Task DeleteService(string id);
        DbSet<Service> GetRepository();
        IQueryable<Service> GetQueryable();
    }
}