namespace backend.DTOs.ServiceDtos
{
    public class ServiceDto
    {
        public string Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public float Price { get; set; }
        public string Unit { get; set; }
        public bool Status { get; set; }
    }
}
