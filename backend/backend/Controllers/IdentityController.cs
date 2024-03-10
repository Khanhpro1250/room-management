using System.Security.Claims;
using AutoMapper;
using backend.Contanst;
using backend.Controllers.Dtos;
using backend.DTOs.CustomerDtos;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Services.CustomerServices;
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
    private readonly IOtpService _otpService;
    private readonly ICustomerService _customerService;

    public IdentityController(IUserService userService, IMapper mapper, IOtpService otpService,
        ICustomerService customerService)
    {
        _userService = userService;
        _mapper = mapper;
        _otpService = otpService;
        _customerService = customerService;
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

    [HttpPost("check-register")]
    public async Task<ApiResponse<object>> CheckRegisterUser([FromBody] CreateUpdateUserDtos user)
    {
        var checkUserRegister = await _userService.IsValidUserRegister(user);
        if (!checkUserRegister) return ApiResponse<object>.Fail("UserName or email is existed");
        await _otpService.GenerateOtp(user.EmailAddress, CommonConstant.TYPE_OPT_REGISTER);
        return ApiResponse<object>.Ok();
    }

    [HttpPost("resent-otp-register")]
    public async Task<ApiResponse<object>> ResentOtpRegisterUser([FromBody] CreateUpdateUserDtos user)
    {
        await _otpService.GenerateOtp(user.EmailAddress, CommonConstant.TYPE_OPT_REGISTER);
        return ApiResponse<object>.Ok();
    }

    [HttpPost("register")]
    public async Task<ApiResponse<UserDto>> RegisterUser([FromBody] RequestWithOtpCode<CreateUpdateUserDtos> request)
    {
        var isValidOtp = await _otpService.ValidateOtp(request.Data.EmailAddress, request.OtpCode,
            CommonConstant.TYPE_OPT_REGISTER);
        if (!isValidOtp) return ApiResponse<UserDto>.Fail("Otp code is invalid");
        var userDto = await _userService.RegisterUser(request.Data);
        return ApiResponse<UserDto>.Ok(userDto);
    }

    [HttpPost("forgot-password")]
    public async Task<ApiResponse<object>> ForgotPassWord([FromBody] ChangePasswordDto request)
    {
        var isValidEmail = await _userService.IsEmailRegister(request.Email);
        if (!isValidEmail) return ApiResponse<object>.Fail("Email is not existed");
        await _otpService.GenerateOtp(request.Email, CommonConstant.TYPE_OPT_FORGOT_PASSWORD);
        return ApiResponse<object>.Ok();
    }

    [HttpPost("change-password")]
    public async Task<ApiResponse<object>> ChangePassWord([FromBody] RequestWithOtpCode<ChangePasswordDto> request)
    {
        var isValidOtp = await _otpService.ValidateOtp(request.Data.Email, request.OtpCode,
            CommonConstant.TYPE_OPT_FORGOT_PASSWORD);
        if (!isValidOtp) return ApiResponse<object>.Fail("Otp code is invalid");
        await _userService.ChangePassWord(request.Data);
        return ApiResponse<object>.Ok();
    }


    [HttpPost("add")]
    public async Task<ApiResponse<UserDto>> CreateUserCount([FromBody] CreateUpdateUserDtos user)
    {
        var checkUserRegister = await _userService.IsValidUserRegister(user);
        if (!checkUserRegister) return ApiResponse<UserDto>.Fail("UserName or email is existed");
        var userDto = await _userService.CreateUser(user);
        return ApiResponse<UserDto>.Ok(userDto);
    }

    [HttpGet("detail/{userId:guid}")]
    public async Task<ApiResponse<UserDto>> GetUserDetail([FromRoute] Guid userId)
    {
        var user = await _userService.GetUserById(userId);
        return ApiResponse<UserDto>.Ok(user);
    }

    [HttpPut("update/{id:guid}")]
    public async Task<ApiResponse<UserDto>> UpdateUserCount([FromBody] CreateUpdateUserDtos user, [FromRoute] Guid id)
    {
        var result = await _userService.UpdateUser(user, id);
        return ApiResponse<UserDto>.Ok(result);
    }

    [HttpDelete("delete/{id:guid}")]
    public async Task<ApiResponse<UserDto>> DeleteUserCount([FromRoute] Guid id)
    {
        await _userService.DeleteUser(id);
        return ApiResponse<UserDto>.Ok();
    }

    [HttpPost("sent-opt-customer-login")]
    public async Task<ApiResponse<object>> SentOptCustomerLogin([FromBody] SentOtpRequestDto request)
    {
        var checkEmailCustomer = await _customerService.CheckEmailCustomer(request.Email);
        if (!checkEmailCustomer) return ApiResponse<object>.Fail("Email is not existed");
        await _otpService.GenerateOtp(request.Email, CommonConstant.CUSTOMER_LOGIN);
        return ApiResponse<object>.Ok();
    }

    [HttpPost("validation-otp-customer")]
    public async Task<ApiResponse<CustomerMobileDto>> ValidationOtpCustomer([FromBody] SentOtpRequestDto request)
    {
        var result = await _customerService.ValidationOtpCustomer(request.OtpCode, request.Email);
        return ApiResponse<CustomerMobileDto>.Ok(result);
    }
}