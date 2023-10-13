using AutoMapper;
using backend.DTOs.CustomerDtos;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Services;

namespace backend.Mapper
{
    public class ServiceMapper : Profile
    {
        public ServiceMapper()
        {
            CreateMap<Service, ServiceDto>();
            CreateMap<CreateUpdateServiceDto, Service>();
        }
    }
}