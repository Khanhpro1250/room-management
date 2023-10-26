using System.Security.Claims;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;

namespace backend.Services.UserServices;

public class CurrentUser : ICurrentUser
{
    string[] Roles { get; }
    public string UserName { get; }


    private readonly IHttpContextAccessor _accessor;
    private readonly ClaimsPrincipal _principalAccessor;
    private User _user;
    private readonly IUserAccountRepository _userAccountRepository;

    public CurrentUser(IHttpContextAccessor accessor, ClaimsPrincipal principalAccessor, User user,
        IUserAccountRepository userAccountRepository)
    {
        _accessor = accessor;
        _principalAccessor = principalAccessor;
        _user = user;
        _userAccountRepository = userAccountRepository;
    }

    public string Id
    {
        get
        {
            var userName =
                _principalAccessor.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            if (!string.IsNullOrWhiteSpace(userName))
            {
                var userRepo = _userAccountRepository;
                var userFindTask = userRepo.GetUserByUserName(userName);
                userFindTask.Wait();
                _user = userFindTask.Result;
                if (_user?.Id != null) return (_user?.Id)?.ToString();
            }

            return null;
        }
    }

    public bool IsAdmin
    {
        get
        {
            var userName =
                _principalAccessor.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            if (!string.IsNullOrWhiteSpace(userName))
            {
                var userRepo = _userAccountRepository;
                var userFindTask = userRepo.GetUserByUserName(userName);
                userFindTask.Wait();
                _user = userFindTask.Result;
                if (_user?.Id != null) return _user.IsAdmin;
            }

            return false;
        }
    }
}