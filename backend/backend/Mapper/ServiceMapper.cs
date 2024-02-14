using AutoMapper;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Services;

namespace backend.Mapper
{
    public class ServiceMapper : Profile
    {
        public ServiceMapper()
        {
            CreateMap<Service, ServiceDto>();
            CreateMap<CreateUpdateServiceDto, Service>();
            CreateMap<ServiceCustomerDto, ServiceCustomer>();
            CreateMap<ServiceCustomer, ServiceCustomerDto>();
        }
    }
}