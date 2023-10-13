using Aspose.Words.Lists;
using Newtonsoft.Json;

namespace backend.DTOs.ServiceDtos
{
    public class CreateUpdateServiceDto
    {
        public string Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public float Price { get; set; }
        [JsonProperty("unit")] 
        public List<string> Unit { get; set; }
        public bool Status { get; set; }
    }
}