using backend.Controllers.Dtos.Responese;
using backend.DTOs.ServiceDtos;

namespace backend.Services.ServiceServices
{
    public interface IServiceService
    {
        Task<PaginatedList<ServiceDto>> GetListService();
        Task<ServiceDto> GetServiceById(string serviceId);
        Task<ServiceDto> CreateService(CreateUpdateServiceDto service);
        Task<ServiceDto> UpdateService(CreateUpdateServiceDto service, string id);
        Task DeleteService(string id);

        Task<List<ServiceDto>> GetListServiceRegister();
    }
}
