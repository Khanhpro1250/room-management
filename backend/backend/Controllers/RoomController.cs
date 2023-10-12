using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;
using backend.DTOs.UserDtos;
using backend.Services.RoomServices;
using backend.Services.UserServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

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

        [HttpGet("get-data-with-room/{roomId}")]
        public async Task<ApiResponse<DataWithRoomDto>> GetDataWithRoom([FromQuery] string roomId)
        {
            var result = _roomService.
        }
    }
}