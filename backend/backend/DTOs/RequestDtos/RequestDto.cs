namespace backend.DTOs.RequestDtos
{
    public class RequestDto
    {
        public string Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public string RoomId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime RequestTime { get; set; }
        public string Status { get; set; }
    }
}
