namespace backend.DTOs.ServiceDtos
{
    public class CreateUpdateServiceDto
    {
        public string Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public string RoomId { get; set; }
        public string ContractId { get; set; }
        public string ServiceTypeId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public float Price { get; set; }
        public string Unit { get; set; }
    }
}
