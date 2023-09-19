using backend.Controllers.Dtos.Responese;
using backend.DTOs.NotificationDtos;
using backend.DTOs.RequestDtos;

namespace backend.Services.NotificationServices
{
    public interface INotificationService
    {
        Task<PaginatedList<NotificationDto>> GetListNotification();
        Task<NotificationDto> GetNotificationById(string notificationId);
        Task<NotificationDto> CreateNotification(CreateUpdateNotificationDto notification);
        Task<NotificationDto> UpdateNotification(CreateUpdateNotificationDto notification, string id);
        Task DeleteNotification(string id);
    }
}
