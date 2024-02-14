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

            CreateMap<CreateUpdateRoomDto, Room>()
                .ForMember(x => x.FileEntryCollection, otp => otp.Ignore());
            CreateMap<RoomServiceIndexCreateUpdateDto, RoomServiceIndex>();
        }
    }
}