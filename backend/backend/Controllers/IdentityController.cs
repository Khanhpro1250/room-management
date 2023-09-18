using backend.Controllers.Dtos;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;
using backend.Services.UserServices;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/identity")]
public class IdentityController : ControllerBase
{
    private readonly IUserService _userService;

    public IdentityController(IUserService userService)
    {
        _userService = userService;
    }


    [HttpPost("add")]
    public async Task<ApiResponse<UserDto>> CreateUserCount([FromBody] CreateUpdateUserDtos user)
    {
        var checkUserRegister = await _userService.IsValidUserRegister(user);
        if (!checkUserRegister) return ApiResponse<UserDto>.Fail("UserName or email is existed");
        var userDto = await _userService.CreateUser(user);
        return ApiResponse<UserDto>.Ok(userDto);
    }

    [HttpGet("detail/{userId}")]
    public async Task<ApiResponse<UserDto>> GetUserDetail([FromRoute] string userId)
    {
        var user = await _userService.GetUserById(userId);
        return ApiResponse<UserDto>.Ok(user);
    }

    [HttpPut("update/{id}")]
    public async Task<ApiResponse<UserDto>> UpdateUserCount([FromBody] CreateUpdateUserDtos user, [FromRoute] string id)
    {
        var result = await _userService.UpdateUser(user, id);
        return ApiResponse<UserDto>.Ok(result);
    }

    [HttpDelete("delete/{id}")]
    public async Task<ApiResponse<UserDto>> DeleteUserCount([FromRoute] string id)
    {
        await _userService.DeleteMenu(id);
        return ApiResponse<UserDto>.Ok();
    }
}