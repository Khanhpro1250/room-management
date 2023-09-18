namespace backend.Models.Entities.Contracts
{
    public class Contract : AuditedEntity
    {
        public string ContractNumber {  get; set; }
        public string RoomID { get; set; }
        public string CustomerId { get; set; }
        public int Month { get; set; }
        public DateTime SignedDate { get; set; }
        public DateTime EffectDate { get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}
