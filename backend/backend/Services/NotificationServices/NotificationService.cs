using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.NotificationDtos;
using backend.Models.Entities.Notifications;
using backend.Models.Repositorties.NotificationRepositories;

namespace backend.Services.NotificationServices
{
    public class NotificationService : INotificationService
    {
        // private readonly INotificationRepository _notificationRopository;
        // private readonly IMapper _mapper;
        //
        // public NotificationService(INotificationRepository notificationRepository, IMapper mapper)
        // {
        //     _notificationRopository = notificationRepository;
        //     _mapper = mapper;
        // }
        // public async Task<NotificationDto> CreateNotification(CreateUpdateNotificationDto notification)
        // {
        //     var notificationEntity = _mapper.Map<CreateUpdateNotificationDto, Notification>(notification);
        //     var result = await _notificationRopository.CreateNotification(notificationEntity);
        //     return _mapper.Map<Notification, NotificationDto>(result);
        // }
        //
        // public async Task DeleteNotification(string id)
        // {
        //     await _notificationRopository.DeleteNotification(id);
        // }
        //
        // public async Task<PaginatedList<NotificationDto>> GetListNotification()
        // {
        //     var listNotification = await _notificationRopository.GetListNotification();
        //     var result = _mapper.Map<List<Notification>, List<NotificationDto>>(listNotification);
        //     return new PaginatedList<NotificationDto>(result, result.Count, 0, 10);
        // }
        //
        // public async Task<NotificationDto> GetNotificationById(string notificationId)
        // {
        //     var notification = await _notificationRopository.GetNotificationById(notificationId);
        //     var result = _mapper.Map<Notification, NotificationDto>(notification);
        //     return result;
        // }
        //
        // public async Task<NotificationDto> UpdateNotification(CreateUpdateNotificationDto notification, string id)
        // {
        //
        //     var notificationEntity = _mapper.Map<CreateUpdateNotificationDto, Notification>(notification);
        //     var result = await _notificationRopository.UpdateNotification(notificationEntity, id);
        //     return _mapper.Map<Notification, NotificationDto>(result);
        // }
    }
}
