using backend.Controllers.Dtos.Responese;

namespace backend.Controllers.Dtos;

public class ApiResponseDto<TResult> : ApiResponse where TResult : class
{
    public TResult Result { get; }

    private ApiResponseDto(
        bool success,
        string message,
        TResult result,
        object error = null,
        int statusCode = 200)
        : base(success, message, error, statusCode)
    {
        this.Result = result;
    }

    public static ApiResponseDto<TResult> Ok(TResult result = null, string message = null) =>
        new ApiResponseDto<TResult>(true, message, result);

    public static ApiResponseDto<TResult> Fail(
        string message,
        object errors = null,
        int statusCode = 500,
        TResult result = null)
    {
        return new ApiResponseDto<TResult>(false, message, result, errors, statusCode);
    }
}