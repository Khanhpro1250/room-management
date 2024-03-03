using AutoMapper;
using backend.DTOs.ContractDtos;
using backend.DTOs.ReportDtos;
using backend.Models.Entities.Contracts;

namespace backend.Mapper
{
    public class ContractMapper : Profile
    {
        public ContractMapper()
        {
            CreateMap<Contract, ContractDto>();
            CreateMap<CreateUpdateContractDto, Contract>();
            CreateMap<Contract, ReportContractExpireDto>()
                .ForMember(x => x.HouseName, opt => opt.MapFrom(x => x.Customer.Room.House.Name))
                .ForMember(x => x.RoomCode, opt => opt.MapFrom(x => x.Customer.Room.RoomCode))
                .ForMember(x => x.CustomerId, opt => opt.MapFrom(x => x.CustomerId))
                .ForMember(x => x.CustomerName, opt => opt.MapFrom(x => x.Customer.FullName))
                .ForMember(x => x.CustomerEmail, opt => opt.MapFrom(x => x.Customer.Email));
        }
    }
}