﻿using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;

namespace backend.Services.RoleServices
{
    public interface IRoleService
    {
        Task<PaginatedList<RoleDto>> GetListRole(PaginatedListQuery paginatedListQuery);
        Task<RoleDto> GetRoleById(Guid id);
        Task<RoleDto> CreateRole(CreateUpdateRoleDto role);
        Task<RoleDto> UpdateRole(CreateUpdateRoleDto role, string id);
        Task<RoleDto> UpdateRoleUser(UpdateUserRoleDto userRoleDto);
        Task<List<ComboOptionDto>> GetComboRole();
        Task DeleteRole(Guid id);

        Task<List<Guid>> GetPermissionWithCurrentUser();
    }
}