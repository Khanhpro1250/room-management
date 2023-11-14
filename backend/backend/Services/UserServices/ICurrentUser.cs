namespace backend.Services.UserServices;

public interface ICurrentUser
{
    Guid Id { get; }
    bool IsAdmin { get; }

    string UserName { get; }
}