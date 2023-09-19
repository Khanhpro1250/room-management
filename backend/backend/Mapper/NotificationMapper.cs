using AutoMapper;
using backend.DTOs.NotificationDtos;
using backend.DTOs.RequestDtos;
using backend.Models.Entities.Notifications;
using backend.Models.Entities.Requests;

namespace backend.Mapper
{
    public class NotificationMapper : Profile
    {
        public NotificationMapper()
        {
            CreateMap<Notification, NotificationDto>();
            CreateMap<CreateUpdateNotificationDto, Notification>();
        }
    }
}
