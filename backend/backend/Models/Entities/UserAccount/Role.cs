using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace backend.Models.Entities.UserAccount;

public class Role: AuditedEntity
{
    public string Name { get; set; }
    public string Code { get; set; }
    [JsonProperty("userIds")]
    public List<string> UserIds { get; set; }
    
}