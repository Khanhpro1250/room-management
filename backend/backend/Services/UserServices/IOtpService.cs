namespace backend.Services.UserServices;

public interface IOtpService
{
    Task GenerateOtp(string email, string type);
    Task<bool> ValidateOtp(string email, string otp, string type);
}