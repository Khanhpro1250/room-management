using AutoMapper;
using backend.DTOs.HouseDtos;
using backend.DTOs.MenuDtos;
using backend.Models.Entities.Houses;

namespace backend.Mapper;

public class HouseMapper : Profile
{
    public HouseMapper()
    {
        CreateMap<CreateUpdateHouseDto, House>();
        CreateMap<House, HouseDto>();
    }
}