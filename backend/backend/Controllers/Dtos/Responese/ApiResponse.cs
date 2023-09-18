using Newtonsoft.Json;

namespace backend.Controllers.Dtos.Responese;

public class ApiResponse
{
    public bool Success { get; }

    public string Message { get; }

    public object Error { get; }

    [JsonIgnore] public int StatusCode { get; }

    protected ApiResponse(bool success, string message, object error = null, int statusCode = 200)
    {
        this.Message = message;
        this.Error = error;
        this.StatusCode = statusCode;
        this.Success = success;
    }

    public static ApiResponse Ok(string message = null) => new ApiResponse(true, message);

    public static ApiResponse Fail(string message, object errors = null, int statusCode = 500) =>
        new ApiResponse(false, message, errors);
}