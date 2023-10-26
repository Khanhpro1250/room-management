namespace backend.Services.UserServices;

public interface ICurrentUser
{
    string Id { get; }
    bool IsAdmin { get; }

    string UserName { get; }
}