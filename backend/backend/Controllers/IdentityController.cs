using System.Security.Claims;
using AutoMapper;
using backend.Controllers.Dtos;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/identity")]
public class IdentityController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public IdentityController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpGet("check-login")]
    public async Task<ApiResponse<LoginReponseDto>> CreateUserCount()

    {
        if (HttpContext.User.Identity != null && HttpContext.User.Identity.IsAuthenticated)
        {
            var usernameClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);

            if (usernameClaim != null)

            {
                string username = usernameClaim.Value;

                var findUser = await _userService.GetUserByUserName(username);

                var userClone = _mapper.Map<User, UserDto>(findUser);
                var result = new LoginReponseDto
                {
                    User = userClone
                };

                return ApiResponse<LoginReponseDto>.Ok(result);
            }

            return ApiResponse<LoginReponseDto>.Fail("User not login");
        }

        return ApiResponse<LoginReponseDto>.Fail("User not login");
    }

    [HttpPost("login")]
    public async Task<ApiResponse<LoginReponseDto>> Login([FromBody] LoginDto login)
    {
        var findUser = await _userService.GetUserByUserName(login.UserName);
        var isValidPassword = findUser != null && PasswordHasher.VerifyPassword(login.Password, findUser.PasswordHash);
        if (isValidPassword)
        {
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, findUser.UserName) },
                    CookieAuthenticationDefaults.AuthenticationScheme)),
                new AuthenticationProperties { IsPersistent = true });
            var result = new LoginReponseDto()
            {
                User = _mapper.Map<User, UserDto>(findUser)
            };
            return ApiResponse<LoginReponseDto>.Ok(result);
        }

        return ApiResponse<LoginReponseDto>.Fail("Login failed");
    }

    [HttpGet("logout")]
    public async Task<ApiResponse<object>> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return ApiResponse<object>.Ok();
    }

    [HttpPost("register")]
    public async Task<ApiResponse<UserDto>> RegisterUser([FromBody] CreateUpdateUserDtos user)
    {
        var checkUserRegister = await _userService.IsValidUserRegister(user);
        if (!checkUserRegister) return ApiResponse<UserDto>.Fail("UserName or email is existed");
        var userDto = await _userService.RegisterUser(user);
        return ApiResponse<UserDto>.Ok(userDto);
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

    // [HttpDelete("delete/{id}")]
    // public async Task<ApiResponse<UserDto>> DeleteUserCount([FromRoute] string id)
    // {
    //     await _userService.DeleteMenu(id);
    //     return ApiResponse<UserDto>.Ok();
    // }
}