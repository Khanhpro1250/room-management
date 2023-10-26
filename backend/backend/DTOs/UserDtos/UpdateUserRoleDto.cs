using Newtonsoft.Json;

namespace backend.DTOs.UserDtos;

public class UpdateUserRoleDto
{
    public string RoleId { get; set; }
    
    [JsonProperty("userIds")]
    public List<string> UserIds { get; set; }
}