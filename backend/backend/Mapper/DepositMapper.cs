using AutoMapper;
using backend.DTOs.CustomerDtos;
using backend.DTOs.DepositDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Deposits;

namespace backend.Mapper
{
    public class DepositMapper: Profile
    {
        public DepositMapper()
        {
            CreateMap<Deposit, DepositDto>();
            CreateMap<CreateUpdateDepositDto, Deposit>();
        }
    }
}
