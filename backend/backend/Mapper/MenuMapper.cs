using AutoMapper;
using backend.DTOs.MenuDtos;
using backend.Models.Entities.Menus;

namespace backend.Mapper;

public class MenuMapper : Profile
{
    public MenuMapper()
    {
        CreateMap<Menu, MenuDto>();
        CreateMap<CreateUpdateMenuDto, Menu>();
    }
}