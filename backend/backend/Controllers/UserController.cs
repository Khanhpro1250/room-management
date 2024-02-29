using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("combo-user")]
    public async Task<ApiResponse<List<ComboOptionKeyTitleDto>>> GetComboUser()
    {
        var result = await _userService.GetComboUser();
        return ApiResponse<List<ComboOptionKeyTitleDto>>.Ok(result);
    }

    [HttpGet("index")]
    public async Task<ApiResponse<PaginatedList<UserDto>>> GetIndexAction()
    {
        var result = await _userService.GetListUser(Request.Query.GetPaginatedListQuery());
        return ApiResponse<PaginatedList<UserDto>>.Ok(result);
    }

    [HttpGet("detail/{id:guid}")]
    public async Task<ApiResponse<UserDto>> GetDetail([FromRoute] Guid id)
    {
        var result = await _userService.GetUserById(id);
        return ApiResponse<UserDto>.Ok(result);
    }

    [HttpPut("update/{id:guid}")]
    public async Task<ApiResponse<UserDto>> UpdateUser([FromBody] UpdateUserProfileDto user, [FromRoute] Guid id)
    {
        user.Id = id;
        await _userService.UpdateUserProfile(user);
        return ApiResponse<UserDto>.Ok();
    }
}