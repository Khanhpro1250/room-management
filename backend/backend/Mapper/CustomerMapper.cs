using AutoMapper;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;

namespace backend.Mapper
{
    public class CustomerMapper:Profile
    {
        public CustomerMapper()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<CreateUpdateCustomerDto, Customer>();
            CreateMap<MemberDto, Member>();
            CreateMap<Member,MemberDto>();
        }
    }
}
