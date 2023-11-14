namespace backend.Models.Entities.Deposits
{
    public class Deposit : AuditedEntity<Guid>
    {
        public string RoomId { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public float DepositAmount { get; set; }
        public DateTime? ExpectedDate { get; set; }
        public string Status { get; set; }
    }
}
