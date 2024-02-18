using AutoMapper;
using backend.DTOs.RoomDtos;
using backend.Models.Entities.Rooms;

namespace backend.Mapper
{
    public class RoomMapper : Profile
    {
        public RoomMapper()
        {
            CreateMap<Room, RoomDto>();
            CreateMap<RoomProcess, RoomProcessDto>()
                .ForMember(x => x.CustomerName, otp => otp.MapFrom(x => x.Customer.FullName))
                .ForMember(x => x.RoomCode, otp => otp.MapFrom(x => x.Room.RoomCode))
                .ForMember(x => x.HouseName, otp => otp.MapFrom(x => x.Room.House.Name))
                ;

            CreateMap<CreateUpdateRoomDto, Room>()
                .ForMember(x => x.FileEntryCollection, otp => otp.Ignore());
            CreateMap<RoomServiceIndexCreateUpdateDto, RoomServiceIndex>();


            CreateMap<CalculateCharge, CalculateChargeGridDto>()
                .ForMember(x => x.CustomerName, otp => otp.MapFrom(x => x.Customer.FullName))
                .ForMember(x => x.HouseName, otp => otp.MapFrom(x => x.Room.House.Name))
                .ForMember(x => x.RoomCode, otp => otp.MapFrom(x => x.Room.RoomCode))
                ;
        }
    }
}