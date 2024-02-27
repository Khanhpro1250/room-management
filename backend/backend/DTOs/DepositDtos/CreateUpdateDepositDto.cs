namespace backend.DTOs.DepositDtos
{
    public class CreateUpdateDepositDto
    {
        public Guid? Id { get; set; }
        public Guid RoomId { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public decimal DepositAmount { get; set; }
        public DateTime DepositDate { get; set; }
        public DateTime? ExpectedDate { get; set; }
        public int MaximumDays { get; set; }
        public string Note { get; set; }
        public string Status { get; set; }
    }
}
