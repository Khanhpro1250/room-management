using AutoMapper;
using backend.DTOs.ContractDtos;
using backend.DTOs.CustomerDtos;
using backend.Models.Entities.Contracts;
using backend.Models.Entities.Customers;

namespace backend.Mapper
{
    public class ContractMapper: Profile
    {
        public ContractMapper()
        {
            CreateMap<Contract, ContractDto>();
            CreateMap<CreateUpdateContractDto, Contract>();
        }
    }
}
