using backend.DTOs.NotificationDtos;
using backend.Services.NotificationServices;
using Microsoft.AspNetCore.Mvc;
using backend.Controllers.Dtos.Responese;
using backend.Controllers.Dtos;

namespace backend.Controllers
{
    public class NotificationController : ControllerBase
    {
        // private readonly INotificationService _notificationService;
        //
        // public NotificationController(INotificationService notificationService)
        // {
        //     _notificationService = notificationService;
        // }
        //
        //
        // [HttpGet("index")]
        // public async Task<ApiResponse<PaginatedList<NotificationDto>>> GetIndex()
        // {
        //     var result = await _notificationService.GetListNotification();
        //     return ApiResponse<PaginatedList<NotificationDto>>.Ok(result);
        // }
        //
        //
        // [HttpGet("detail/{id}")]
        // public async Task<ApiResponse<NotificationDto>> GetDetail([FromRoute] string id)
        // {
        //     var result = await _notificationService.GetNotificationById(id);
        //     return ApiResponse<NotificationDto>.Ok(result);
        // }
        //
        // [HttpPost("create")]
        // public async Task<ApiResponse<NotificationDto>> CreateAction([FromBody] CreateUpdateNotificationDto notificationDto)
        // {
        //     var result = await _notificationService.CreateNotification(notificationDto);
        //     return ApiResponse<NotificationDto>.Ok(result);
        // }
        //
        // [HttpPut("update/{id}")]
        // public async Task<ApiResponse<NotificationDto>> UpdateAction([FromBody] CreateUpdateNotificationDto notificationDto, [FromRoute] string id)
        // {
        //     var result = await _notificationService.UpdateNotification(notificationDto, id);
        //     return ApiResponse<NotificationDto>.Ok(result);
        // }
        //
        // [HttpDelete("delete/{id}")]
        // public async Task<ApiResponse> DeleteAction([FromRoute] string id)
        // {
        //     await _notificationService.DeleteNotification(id);
        //     return ApiResponse.Ok();
        // }
    }
}
