using Newtonsoft.Json;

namespace backend.Models.Entities.Services
{
    public class Service: AuditedEntity
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public float Price { get; set; }
        [JsonProperty("unit")] 
        public List<string> Unit { get; set; }
        public bool Status { get; set; }
    }
}
