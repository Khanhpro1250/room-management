﻿using AutoMapper;
using backend.DTOs.RoomDtos;
using backend.DTOs.UserDtos;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.RoomRepositories;
using backend.Models.Repositorties.UserAccountRepositories;

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

        public async Task<List<RoomDto>> GetListRoom()
        {
            var listRoom = await _roomRepository.GetListRoom();
            var result = _mapper.Map<List<Room>, List<RoomDto>>(listRoom);
            return result;
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