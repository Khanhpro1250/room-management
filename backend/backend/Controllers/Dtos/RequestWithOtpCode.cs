namespace backend.Controllers.Dtos;

public class RequestWithOtpCode<T> where T : class
{
    public string OtpCode { get; set; }
    public T Data { get; set; }
}