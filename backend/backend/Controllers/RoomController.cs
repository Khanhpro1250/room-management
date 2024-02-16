using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;
using backend.Services.RoomServices;
using backend.Utils;
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
        public async Task<ApiResponse<RoomDto>> CreateRoom([FromForm] CreateUpdateRoomDto room)
        {
            var result = await _roomService.CreateRoom(room);
            return ApiResponse<RoomDto>.Ok(result);
        }

        [HttpGet("detail/{roomId:guid}")]
        public async Task<ApiResponse<RoomDto>> GetRoomDetail([FromRoute] Guid roomId)
        {
            var result = await _roomService.GetRoomById(roomId);
            return ApiResponse<RoomDto>.Ok(result);
        }

        [HttpPut("update/{roomId:guid}")]
        public async Task<ApiResponse<RoomDto>> UpdateRoom([FromRoute] Guid roomId,
            [FromForm] CreateUpdateRoomDto room)
        {
            var result = await _roomService.UpdateRoom(room, roomId);
            return ApiResponse<RoomDto>.Ok(result);
        }


        [HttpDelete("delete/{id:guid}")]
        public async Task<ApiResponse<RoomDto>> DeleteRoom([FromRoute] Guid id)
        {
            await _roomService.DeleteRoom(id);
            return ApiResponse<RoomDto>.Ok();
        }

        [HttpPut("return/{id:guid}")]
        public async Task<ApiResponse<object>> UpdateServiceIndexRoom([FromRoute] Guid id)
        {
            await _roomService.ReturnRoom(id);
            return ApiResponse<object>.Ok();
        }

        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<RoomDto>>> GetListRoom([FromQuery] RoomFiterDto filterDto)
        {
            filterDto.PaginatedListQuery = Request.Query.GetPaginatedListQuery();
            var result = await _roomService.GetListRoom(filterDto);
            return ApiResponse<PaginatedList<RoomDto>>.Ok(result);
        }

        [HttpGet("get-data-with-room")]
        public async Task<ApiResponse<DataWithRoomDto>> GetDataWithRoom([FromQuery] Guid roomId)
        {
            var result = await _roomService.GetDataWithRoom(roomId);
            return ApiResponse<DataWithRoomDto>.Ok(result);
        }

        [HttpGet("list-electric-service")]
        public async Task<ApiResponse<PaginatedList<RoomElectricServiceDto>>> GetElectricServices(
            [FromQuery] ElectricServiceFilterDto filterDto)
        {
            var result = await _roomService.GetElectricServiceRoom(filterDto);
            return ApiResponse<PaginatedList<RoomElectricServiceDto>>.Ok(result);
        }

        [HttpPut("service-index/update")]
        public async Task<ApiResponse<object>> UpdateServiceIndexRoom(
            [FromBody] RoomServiceIndexCreateUpdateDto updateDto)
        {
            await _roomService.UpdateServiceIndex(updateDto);
            return ApiResponse<object>.Ok();
        }
    }
}