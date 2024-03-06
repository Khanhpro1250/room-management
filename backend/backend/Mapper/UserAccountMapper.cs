using AutoMapper;
using backend.DTOs.CustomerDtos;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;

namespace backend.Mapper;

public class UserAccountMapper : Profile
{
    public UserAccountMapper()
    {
        CreateMap<User, UserDto>();
        CreateMap<User, HouseOwnerDto>();
        CreateMap<UpdateUserProfileDto, User>();
        CreateMap<CreateUpdateUserDtos, User>()
            .ForMember(x => x.UserName, opt => opt.MapFrom(src => src.UserName.ToLower()))
            .ForMember(x => x.EmailAddress, opt => opt.MapFrom(src => src.EmailAddress.ToLower()))
            ;
    }
}