using System.Net;
using System.Net.Mail;

namespace backend.Services.SendMailServices;

public class SendMailService : ISendMailService
{
    private readonly IConfiguration _configuration;

    public SendMailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendMail(string toEmail, string subject, string body)
    {
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var port = int.Parse(_configuration["EmailSettings:Port"]);
        var username = _configuration["EmailSettings:Username"];
        var password = _configuration["EmailSettings:Password"];
        var senderName = _configuration["EmailSettings:SenderName"];
        var senderEmail = _configuration["EmailSettings:SenderEmail"];
        
        
        using (var client = new SmtpClient(smtpServer, port))
        {
            client.Credentials = new NetworkCredential(username, password);
            client.EnableSsl = true;

            var mailMessage = new MailMessage
            {
                From = new MailAddress(senderEmail, senderName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mailMessage.To.Add(toEmail);

            try
            {
                await client.SendMailAsync(mailMessage);
            }
            catch (Exception ex)
            {
                // Handle email sending error
                Console.WriteLine($"Email sending error: {ex.Message}");
            }
        }
    }
    
}