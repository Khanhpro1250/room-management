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
    public class RoomController: ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateRoom([FromBody] CreateUpdateRoomDto room)
        {
            await _roomService.CreateRoom(room);
            return new ObjectResult(room);
        }
        [HttpGet("detail/{roomId}")]
        public async Task<ActionResult> GetRoomDetail([FromRoute] string roomId)
        {
            var result = await _roomService.GetRoomById(roomId);
            return new ObjectResult(result);
        }
        [HttpPost("update/{roomId}")]
        public async Task<ActionResult> UpdateRoom([FromRoute] string roomId, [FromBody] CreateUpdateRoomDto room)
        {
            var result = await _roomService.UpdateRoom(room, roomId);
            return new ObjectResult(result);
            
        }


        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteRoom([FromRoute] string id)
        {
            await _roomService.DeleteRoom(id);
            return new OkResult();
        }
        [HttpGet("index")]
        public async Task<ActionResult> GetListRoom()
        {
            var result = await _roomService.GetListRoom();
            return new ObjectResult(result);
        }


    }
}
