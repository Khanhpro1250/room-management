using Newtonsoft.Json;

namespace backend.DTOs.UserDtos
{
    public class RoleDto
    {
        public Guid Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        [JsonProperty("userIds")]
        public List<string> UserIds { get; set; }
    }
}
