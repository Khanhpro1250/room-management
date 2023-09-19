namespace backend.DTOs.NotificationDtos
{
    public class CreateUpdateNotificationDto
    {
        public string Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime DateNotify { get; set; }
    }
}
