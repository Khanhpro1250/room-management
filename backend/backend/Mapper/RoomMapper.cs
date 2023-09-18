using AutoMapper;
using backend.DTOs.MenuDtos;
using backend.DTOs.RoomDtos;
using backend.DTOs.UserDtos;
using backend.Models.Entities.Menus;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.UserAccount;

namespace backend.Mapper
{
    public class RoomMapper: Profile
    {
        public RoomMapper()
        {
            CreateMap<Room, RoomDto>();
            CreateMap<CreateUpdateRoomDto, Room>();
        }
    }
}
