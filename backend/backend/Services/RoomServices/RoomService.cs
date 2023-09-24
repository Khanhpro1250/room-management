using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;
using backend.DTOs.UserDtos;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.RoomRepositories;
using backend.Models.Repositorties.UserAccountRepositories;
using MongoDB.Driver;

namespace backend.Services.RoomServices
{
    public class RoomService: IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IMapper _mapper;

        public RoomService(IRoomRepository roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }
        public async Task<RoomDto> CreateRoom(CreateUpdateRoomDto room)
        {
            var roomEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
            var result = await _roomRepository.CreateRoom(roomEntity);
            return _mapper.Map<Room, RoomDto>(result);
        }

        public async Task DeleteRoom(string id)
        {
            await _roomRepository.DeleteRoom(id);
        }

        public async Task<PaginatedList<RoomDto>> GetListRoom(string houseId)
        {
            var queryable = _roomRepository.GetQueryable();
            var listRoom = await queryable.Find(x => x.HouseId.Contains(houseId)).ToListAsync();
            var result = _mapper.Map<List<Room>, List<RoomDto>>(listRoom);
            return new PaginatedList<RoomDto>(result,result.Count,0,10);
        }

        public async Task<RoomDto> GetRoomById(string roomId)
        {
            var room = await _roomRepository.GetRoomById(roomId);
            var result = _mapper.Map<Room, RoomDto>(room);
            return result;
        }

        public async Task<RoomDto> UpdateRoom(CreateUpdateRoomDto room,  string id)
        {
            
            var roomEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
            var result = await _roomRepository.UpdateRoom(roomEntity, id);
            return _mapper.Map<Room, RoomDto>(result);
        }
    }
}
