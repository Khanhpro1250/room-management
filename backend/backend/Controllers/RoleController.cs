using backend.Controllers.Dtos.Responese;
using backend.Controllers.Dtos;
using backend.Services.RoleServices;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs.UserDtos;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/role")]
    public class RoleController
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }


        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<RoleDto>>> GetIndex()
        {
            var result = await _roleService.GetListRole();
            return ApiResponse<PaginatedList<RoleDto>>.Ok(result);
        }


        [HttpGet("detail/{id}")]
        public async Task<ApiResponse<RoleDto>> GetDetail([FromRoute] string id)
        {
            var result = await _roleService.GetRoleById(id);
            return ApiResponse<RoleDto>.Ok(result);
        }

        [HttpPost("create")]
        public async Task<ApiResponse<RoleDto>> CreateAction([FromBody] CreateUpdateRoleDto roleDto)
        {
            var result = await _roleService.CreateRole(roleDto);
            return ApiResponse<RoleDto>.Ok(result);
        }

        [HttpPut("update/{id}")]
        public async Task<ApiResponse<RoleDto>> UpdateAction([FromBody] CreateUpdateRoleDto roleDto, [FromRoute] string id)
        {
            var result = await _roleService.UpdateRole(roleDto, id);
            return ApiResponse<RoleDto>.Ok(result);
        }

        [HttpDelete("delete/{id}")] 
        public async Task<ApiResponse> DeleteAction([FromRoute] string id)
        {
            await _roleService.DeleteRole(id);
            return ApiResponse.Ok();
        }

        [HttpGet("combo")]
        public async Task<ApiResponse<List<ComboOptionDto>>> GetComboRole()
        {
            var result = await _roleService.GetComboRole(); 
            return ApiResponse<List<ComboOptionDto>>.Ok(result);
        }
        
        [HttpPut("update-user-role")]
        public async Task<ApiResponse<RoleDto>> UpdateRoleUser([FromBody] UpdateUserRoleDto userRoleDto)
        {
            var result = await _roleService.UpdateRoleUser(userRoleDto);
            return ApiResponse<RoleDto>.Ok(result);
        }
        
    }
}
