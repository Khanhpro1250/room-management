namespace backend.Models.Entities.Requests
{
    public class Request:AuditedEntity
    {
        public string RoomId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime RequestTime { get; set; }
        public string Status { get; set; }
    }
}
