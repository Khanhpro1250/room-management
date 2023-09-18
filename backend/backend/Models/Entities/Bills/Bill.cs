namespace backend.Models.Entities.Bills
{
    public class Bill: AuditedEntity
    {
        public string PaymentTypeId { get; set; }
        public float PaymentAmount { get; set; }
        public string RoomId {  get; set; }
        public int Month {  get; set; }
        public int Year { get; set; }
    }
}
