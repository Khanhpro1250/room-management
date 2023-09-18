namespace backend.DTOs.DepositDtos
{
    public class CreateUpdateDepositDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public string RoomId { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public float DepositAmount { get; set; }
        public DateTime? ExpectedDate { get; set; }
        public string Status { get; set; }
    }
}
