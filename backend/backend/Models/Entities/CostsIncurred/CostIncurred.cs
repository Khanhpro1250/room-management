namespace backend.Models.Entities.CostsIncurred
{
    public class CostIncurred: AuditedEntity<Guid>
    {
        public string RoomId {  get; set; }
        public float PaymentAmount { get; set; }
        public bool IsMaintenance { get; set; }
        public DateTime DatePaid { get; set; }
        public string Reason { get; set; }
    }
}
