using System.Reflection.Metadata;

namespace backend.DTOs.MenuDtos;

public class MenuLayoutDto
{
   public string Name { get; set; }
   public string Route { get; set; }
   public string Background { get; set; }
   public int Level { get; set; }
   public string Icon { get; set; }
   public Guid Key { get; set; }
   public Guid? ParentKey { get; set; }
   public List<MenuLayoutDto> Children { get; set; }
   public bool IsDisplay { get; set; }
   public List<string> BreadCrumbs { get; set; }
   public string Path { get; set; }
   public bool HasPermissionToAccess { get; set; }
   public string Permissions { get; set; }
   public DateTime? CreatedTime { get; set; }
}