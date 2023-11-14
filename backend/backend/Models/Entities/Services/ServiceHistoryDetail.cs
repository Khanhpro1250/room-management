namespace backend.Models.Entities.Services
{
    public class ServiceHistoryDetail : AuditedEntity<Guid>
    {
        public string ServiceId { get; set; }
        public float OldQuantity { get; set; }
        public float Quantity { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public bool IsUsed { get; set; }
    }
}