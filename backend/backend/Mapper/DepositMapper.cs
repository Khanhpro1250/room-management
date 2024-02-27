using AutoMapper;
using backend.DTOs.DepositDtos;
using backend.Models.Entities.Deposits;

namespace backend.Mapper;

public class DepositMapper : Profile
{
    public DepositMapper()
    {
        CreateMap<Deposit, DepositDto>()
            .ForMember(x => x.HouseId, opt => opt.MapFrom(x => x.Room.HouseId))
            .ForMember(x => x.HouseName, opt => opt.MapFrom(x => x.Room.House.Name))
            .ForMember(x => x.RoomCode, opt => opt.MapFrom(x => x.Room.RoomCode));
        CreateMap<CreateUpdateDepositDto, Deposit>();
    }
}