namespace backend.Models.Entities.Bills
{
    public class BillItem: AuditedEntity<Guid>
    {
        public string BillId { get; set; }
        public string ServiceId { get; set; }
    }
}
