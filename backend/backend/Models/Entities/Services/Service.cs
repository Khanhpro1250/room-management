namespace backend.Models.Entities.Services
{
    public class Service: AuditedEntity
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public float Price { get; set; }
        public string Unit { get; set; }
        public bool Status { get; set; }
    }
}
