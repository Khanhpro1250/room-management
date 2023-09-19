using AutoMapper;
using backend.DTOs.ServiceDtos;
using backend.DTOs.UserDtos;
using backend.Models.Entities.Services;
using backend.Models.Entities.UserAccount;

namespace backend.Mapper
{
    public class RoleMapper : Profile
    {
        public RoleMapper()
        {
            CreateMap<Role, RoleDto>();
            CreateMap<CreateUpdateRoleDto, Role>();
        }
    }
}
