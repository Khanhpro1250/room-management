using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models.Entities.UserAccount;

public class Role: AuditedEntity
{
    public string Name { get; set; }
    public string Code { get; set; }
}