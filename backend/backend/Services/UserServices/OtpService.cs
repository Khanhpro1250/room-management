using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories.OtpRepositories;
using backend.Services.SendMailServices;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.UserServices;

public class OtpService : IOtpService
{
    private readonly IOtpRepository _otpRepository;
    private readonly ISendMailService _sendMailService;

    public OtpService(IOtpRepository otpRepository, ISendMailService sendMailService)
    {
        _otpRepository = otpRepository;
        _sendMailService = sendMailService;
    }

    public async Task GenerateOtp(string email, string type)
    {
        var queryable = _otpRepository.GetQueryable();
        var oldOtp = await queryable.Where(x => x.EmailRequest == email && x.Type == type && !x.IsUsed)
            .OrderByDescending(x => x.CreatedTime).FirstOrDefaultAsync();
        var otpCode = oldOtp?.Code ?? GenerateRandomOtp();
        var htmlContent = $@"<!DOCTYPE html>
<html lang=""en"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <style>
    /* Add your custom styles here if needed */
  </style>
</head>
<body style=""margin: 0; padding: 0;"">

  <table role=""presentation"" width=""100%"" cellspacing=""0"" cellpadding=""0"" style=""background-color: #fafbfc;"">
    <tr>
      <td>
        <table role=""presentation"" width=""100%"" cellspacing=""0"" cellpadding=""0"" style=""padding-bottom: 20px; padding-top: 20px;"">
          <tr>
            <td>
              <table role=""presentation"" width=""100%"" cellspacing=""0"" cellpadding=""0"">
                <tr>
                  <td align=""center"" style=""font-size: 25px; font-weight: bold; color: #73a5f5; font-family: 'open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 25px;"">
                    Hệ thống quản lý phòng trọ IRoom
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table role=""presentation"" width=""100%"" cellspacing=""0"" cellpadding=""0"" style=""background-color: #fff; padding-bottom: 20px; padding-top: 20px;"">
          <tr>
            <td>
              <table role=""presentation"" width=""100%"" cellspacing=""0"" cellpadding=""0"">
                <tr>
                  <td align=""center"" style=""font-size: 18px; font-family: 'open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 25px;"">
                    Chào {email},
                  </td>
                </tr>
                <tr>
                  <td align=""center"" style=""font-size: 16px; font-family: 'open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 25px;"">
                    Đây là OTP của bạn có hiệu lực trong 5 phút:
                  </td>
                </tr>
                <tr>
                  <td align=""center"" style=""font-size: 24px; background-color: #20c997; font-weight: bold; font-family: 'open Sans', Helvetica, Arial, sans-serif; color: #f55151;"">
                    {otpCode}
                  </td>
                </tr>
                <tr>
                  <td align=""center"" style=""font-size: 16px; font-family: 'open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 16px;"">
                    Nếu bạn không gửi yêu cầu này vui lòng bỏ qua email này.
                  </td>
                </tr>
                <tr>
                  <td align=""center"" style=""font-size: 16px; font-family: 'open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 25px;"">
                    Xin cảm ơn!<br /><br />IRoom team
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
";
        if (oldOtp is not null)
        {
            oldOtp.ExpriedTime = DateTime.Now.AddMinutes(5);
            await _otpRepository.UpdateAsync(oldOtp, true);
        }
        else
        {
            var otp = new Otp
            {
                Code = otpCode,
                EmailRequest = email,
                ExpriedTime = DateTime.Now.AddMinutes(5),
                Type = type
            };
            await _otpRepository.AddAsync(otp, true);
        }

        await _sendMailService.SendMail(email, "IRoom - OTP", htmlContent);
    }

    public async Task<bool> ValidateOtp(string email, string otp, string type)
    {
        var query = _otpRepository.GetQueryable();
        var result = await query.Where(x => x.EmailRequest == email && x.Code == otp && x.Type == type && !x.IsUsed)
            .OrderByDescending(x => x.CreatedTime).FirstOrDefaultAsync();
        if (result.ExpriedTime < DateTime.Now)
        {
            return false;
        }

        await _otpRepository.DeleteAsync(result, true);
        return true;
    }
    
    

    private string GenerateRandomOtp()
    {
        var random = new Random();
        var otp = random.Next(100000, 999999);
        return otp.ToString();
    }
}