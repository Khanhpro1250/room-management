namespace backend.Models.Entities.Notifications
{
    public class Notification: AuditedEntity<Guid>
    {
        public string Title {  get; set; }
        public string Message { get; set; }
        public DateTime DateNotify {  get; set; }
    }
}
