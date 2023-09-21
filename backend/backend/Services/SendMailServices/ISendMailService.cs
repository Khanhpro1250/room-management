namespace backend.Services.SendMailServices;

public interface ISendMailService
{
    Task SendMail(string toEmail, string subject, string body);

}