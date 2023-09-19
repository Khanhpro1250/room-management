using AutoMapper;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RequestDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Requests;

namespace backend.Mapper
{
    public class RequestMapper : Profile
    {
        public RequestMapper()
        {
            CreateMap<Request, RequestDto>();
            CreateMap<CreateUpdateRequestDto, Request>();
        }
    }
}
