﻿using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;
using backend.Services.RoomServices;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/room")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpPost("create")]
        public async Task<ApiResponse<RoomDto>> CreateRoom([FromBody] CreateUpdateRoomDto room)
        {
            var result = await _roomService.CreateRoom(room);
            return ApiResponse<RoomDto>.Ok(result);
        }

        [HttpGet("detail/{roomId}")]
        public async Task<ApiResponse<RoomDto>> GetRoomDetail([FromRoute] string roomId)
        {
            var result = await _roomService.GetRoomById(roomId);
            return ApiResponse<RoomDto>.Ok(result);
        }

        [HttpPut("update/{roomId}")]
        public async Task<ApiResponse<RoomDto>> UpdateRoom([FromRoute] string roomId,
            [FromBody] CreateUpdateRoomDto room)
        {
            var result = await _roomService.UpdateRoom(room, roomId);
            return ApiResponse<RoomDto>.Ok(result);
        }


        [HttpDelete("delete/{id}")]
        public async Task<ApiResponse<RoomDto>> DeleteRoom([FromRoute] string id)
        {
            await _roomService.DeleteRoom(id);
            return ApiResponse<RoomDto>.Ok();
        }

        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<RoomDto>>> GetListRoom([FromQuery] RoomFilterDto filterDto)
        {
            var result = await _roomService.GetListRoom(filterDto);
            return ApiResponse<PaginatedList<RoomDto>>.Ok(result);
        }

        [HttpGet("get-data-with-room")]
        public async Task<ApiResponse<DataWithRoomDto>> GetDataWithRoom([FromQuery] string roomId)
        {
            var result = await _roomService.GetDataWithRoom(roomId);
            return ApiResponse<DataWithRoomDto>.Ok(result);
        }
        
        [HttpGet("list-room-electric-service")]
        public async Task<ApiResponse<List<RoomElectricServiceDto>>> GetElectricServices([FromQuery] ElectricServiceFilterDto filterDto)
        {
            var result = await _roomService.GetElectricServiceRoom(filterDto);
            return ApiResponse<List<RoomElectricServiceDto>>.Ok(result);
        }
    }
}