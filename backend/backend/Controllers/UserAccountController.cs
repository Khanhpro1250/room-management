using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;
using backend.Services.UserServices;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/identity")]
public class UserAccountController : ControllerBase
{
    private readonly IUserService _userService;

    public UserAccountController(IUserService userService)
    {
        _userService = userService;
    }


    [HttpPost("user-account")]
    public async Task<ActionResult> CreateUserCount([FromBody] CreateUpdateUserDtos user)
    {
        await _userService.CreateUser(user);
        return new ObjectResult(user);
    }

    [HttpGet("user-account/{userId}")]
    public async Task<ActionResult> GetUserDetail([FromRoute] string userId)
    {
        var user = await _userService.GetUserById(userId);
        return new ObjectResult(user);
    }

    [HttpPut("user-account/{id}")]
    public async Task<ActionResult> UpdateUserCount([FromBody] CreateUpdateUserDtos user, [FromRoute] string id)
    {
        var result = await _userService.UpdateUser(user, id);
        return new ObjectResult(result);
    }

    [HttpDelete("user-account/{id}")]
    public async Task<ActionResult> DeleteUserCount([FromRoute] string id)
    {
        await _userService.DeleteMenu(id);
        return new OkResult();
    }
}