using Newtonsoft.Json;

namespace backend.DTOs.UserDtos;

public class UpdateUserRoleDto
{
    public Guid RoleId { get; set; }
    public List<Guid> UserIds { get; set; }
}