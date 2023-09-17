using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models.Entities.Menus;

public class Menu : AuditedEntity
{
    public string Name { get; set; }
    public string Route { get; set; }
    public string Icon { get; set; }
    public string Path { get; set; }
    public bool IsDisplay { get; set; } = false;
    public int Level { get; set; } = 1;
    public string Permissions { get; set; }
    public string ParentId { get; set; }
}