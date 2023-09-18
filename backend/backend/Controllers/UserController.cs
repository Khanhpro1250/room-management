using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;
using backend.Services.UserServices;
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
    public async Task<ApiResponse<List<ComboOptionDto>>> GetComboUser()
    {
        var result = await _userService.GetComboUser();
        return ApiResponse<List<ComboOptionDto>>.Ok(result);
    }
    
    [HttpGet("index")]
    public async Task<ApiResponse<PaginatedList<UserDto>>> GetIndexAction()
    {
        var result = await _userService.GetListUser();
        return ApiResponse<PaginatedList<UserDto>>.Ok(result);
    }
}