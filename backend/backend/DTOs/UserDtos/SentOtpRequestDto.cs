namespace backend.DTOs.UserDtos
{
    public class SentOtpRequestDto
    {
        public string? Email { get; set; }
        public string OtpCode { get; set; }
    }
}