namespace backend.Models.Entities.Services
{
    public class Service: AuditedEntity
    {
        public string RoomId { get; set; }
        public string ContractId {  get; set; }
        public string ServiceTypeId {  get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public float Price { get; set; }
        public string Unit { get; set; }
    }
}
