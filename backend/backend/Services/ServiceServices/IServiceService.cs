using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ServiceDtos;

namespace backend.Services.ServiceServices
{
    public interface IServiceService
    {
        Task<PaginatedList<ServiceDto>> GetListService(PaginatedListQuery paginatedListQuery);
        Task<ServiceDto> GetServiceById(Guid serviceId);
        Task<ServiceDto> CreateService(CreateUpdateServiceDto service);
        Task<ServiceDto> UpdateService(CreateUpdateServiceDto service, Guid id);
        Task DeleteService(Guid id);
        
        Task<List<ServiceDto>> GetListServiceRegister();
    }
}
