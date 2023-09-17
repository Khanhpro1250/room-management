namespace backend.DTOs.MenuDtos;

public class MenuDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Route { get; set; }
    public string Icon { get; set; }
    public string Path { get; set; }
    public string  abc { get; set; }
    public bool IsDisplay { get; set; } = false;
    public int Level { get; set; } = 1;
    public string Permissions { get; set; }
    public string ParentId { get; set; }
    public string CreatedBy { get; set; }
    public DateTime? CreatedTime { get; set; }
    public string LastModifiedBy { get; set; }
    public DateTime? LastModifiedTime { get; set; }
}