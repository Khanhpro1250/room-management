using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Services;
using backend.Models.Repositorties.ServiceRepositories;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ServiceServices
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _serviceRopository;
        private readonly IMapper _mapper;
        private readonly ICurrentUser _currentUser;

        public ServiceService(IServiceRepository serviceRepository, IMapper mapper, ICurrentUser currentUser)
        {
            _serviceRopository = serviceRepository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<ServiceDto> CreateService(CreateUpdateServiceDto service)
        {
            var serviceEntity = _mapper.Map<CreateUpdateServiceDto, Service>(service);
            serviceEntity.CreatedTime = DateTime.Now;
            serviceEntity.CreatedBy = _currentUser.Id.ToString();
            var result = await _serviceRopository.AddAsync(serviceEntity, true);
            return _mapper.Map<Service, ServiceDto>(result);
        }

        public async Task DeleteService(Guid id)
        {
            var findService = await _serviceRopository.GetQueryable()
                                  .AsNoTracking()
                                  .FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                              throw new Exception("Không tìm thấy dịch vụ");
            await _serviceRopository.DeleteAsync(findService, true);
        }

        public async Task<List<ServiceDto>> GetListServiceRegister()
        {
            var result = await _serviceRopository
                .GetQueryable()
                .Where(x => x.Status.Equals(true))
                .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return result;
        }

        public async Task<PaginatedList<ServiceDto>> GetListService(PaginatedListQuery paginatedListQuery)
        {
            var queryable = _serviceRopository.GetQueryable();
            var result = await queryable
                .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
                .QueryablePaging(paginatedListQuery)
                .ToListAsync();
            var count = await queryable.CountAsync();
            foreach (var item in result)
            {
                item.Type = item.Type switch
                {
                    "DIEN" => "Điện",
                    "NUOC" => "Nước",
                    "KHAC" => "Khác",
                    _ => "Khác"
                };
            }

            return new PaginatedList<ServiceDto>(result, count, paginatedListQuery.Offset, paginatedListQuery.Limit);
        }

        public async Task<ServiceDto> GetServiceById(Guid serviceId)
        {
            var service = await _serviceRopository.GetQueryable()
                .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id.Equals(serviceId));

            return service;
        }

        public async Task<ServiceDto> UpdateService(CreateUpdateServiceDto service, Guid id)
        {
            var findService = await _serviceRopository.GetQueryable()
                                  .AsNoTracking()
                                  .FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                              throw new Exception("Không tìm thấy dịch vụ");
            var serviceEntity = _mapper.Map<CreateUpdateServiceDto, Service>(service);
            serviceEntity.LastModifiedTime = DateTime.Now;
            serviceEntity.LastModifiedBy = _currentUser.Id.ToString();
            var result = await _serviceRopository.UpdateAsync(serviceEntity, true);
            return _mapper.Map<Service, ServiceDto>(result);
        }
    }
}