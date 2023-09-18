namespace backend.Models.Entities.Customers
{
    public class Customer: AuditedEntity
    {
        public string UserId {  get; set; }
        public string RoomId { get; set; }
        public string ContractId { get; set; }
        public bool IsRepresent {  get; set; }
        public string IdentityNumber {  get; set; }
        public string IdentityImgLink { get; set; }

    }
}
