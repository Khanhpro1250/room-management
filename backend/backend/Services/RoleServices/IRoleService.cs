using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;

namespace backend.Services.RoleServices
{
    public interface IRoleService
    {
        Task<PaginatedList<RoleDto>> GetListRole();
        Task<RoleDto> GetRoleById(string roleId);
        Task<RoleDto> CreateRole(CreateUpdateRoleDto role);
        Task<RoleDto> UpdateRole(CreateUpdateRoleDto role, string id);
        Task<List<ComboOptionDto>> GetComboRole();
        Task DeleteRole(string id);
    }
}
