using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Services;
using backend.Models.Repositorties.ServiceRepositories;

namespace backend.Services.ServiceServices
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _serviceRopository;
        private readonly IMapper _mapper;

        public ServiceService(IServiceRepository serviceRepository, IMapper mapper)
        {
            _serviceRopository = serviceRepository;
            _mapper = mapper;
        }
        public async Task<ServiceDto> CreateService(CreateUpdateServiceDto service)
        {
            var serviceEntity = _mapper.Map<CreateUpdateServiceDto, Service>(service);
            var result = await _serviceRopository.CreateService(serviceEntity);
            return _mapper.Map<Service, ServiceDto>(result);
        }

        public async Task DeleteService(string id)
        {
            await _serviceRopository.DeleteService(id);
        }

        public async Task<List<ServiceDto>> GetListServiceRegister()
        {
            var listService = await _serviceRopository.GetListService();
            var result = _mapper.Map<List<Service>, List<ServiceDto>>(listService);
            return result;
        }

        public async Task<PaginatedList<ServiceDto>> GetListService()
        {
            var listService = await _serviceRopository.GetListService();
            var result = _mapper.Map<List<Service>, List<ServiceDto>>(listService);
            return new PaginatedList<ServiceDto>(result, result.Count, 0, 10);
        }

        public async Task<ServiceDto> GetServiceById(string serviceId)
        {
            var service = await _serviceRopository.GetServiceById(serviceId);
            var result = _mapper.Map<Service, ServiceDto>(service);
            return result;
        }

        public async Task<ServiceDto> UpdateService(CreateUpdateServiceDto service, string id)
        {
            var serviceEntity = _mapper.Map<CreateUpdateServiceDto, Service>(service);
            var result = await _serviceRopository.UpdateService(serviceEntity, id);
            return _mapper.Map<Service, ServiceDto>(result);
        }
    }
}
