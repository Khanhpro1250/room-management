using AutoMapper;
using backend.DTOs.CustomerDtos;
using backend.Models.Entities.Customers;

namespace backend.Mapper
{
    public class CustomerMapper : Profile
    {
        public CustomerMapper()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<Customer, CustomerListViewDto>();
            CreateMap<PaymentHistory, PaymentHistoryDto>()
                .ForMember(x => x.CustomerName, opt => opt.MapFrom(x => x.Customer.FullName));
            CreateMap<CreateUpdateCustomerDto, Customer>()
                .ForMember(x => x.FileEntryCollection, opt => opt.Ignore());
            CreateMap<MemberDto, Member>();
            CreateMap<Member, MemberDto>();
        }
    }
}