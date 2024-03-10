using AutoMapper;
using backend.DTOs.RoomDtos;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Rooms;
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
            CreateMap<ServiceCustomer, ServiceCustomerDto>()
                .ForMember(x => x.ServiceName, opt => opt.MapFrom(x => x.Service.Name))
                .ForMember(x => x.ServiceUnit, opt => opt.MapFrom(x => x.Service.Unit))
                .ForMember(x => x.ServiceCode, opt => opt.MapFrom(x => x.Service.Code));

            CreateMap<IncurredCost, IncurredCostDto>();
            CreateMap<UpdateIncurredCostDto, IncurredCost>();
        }
    }
}