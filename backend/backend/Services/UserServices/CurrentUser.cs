using System.Security.Claims;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;
using Microsoft.EntityFrameworkCore;

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

    public Guid Id
    {
        get
        {
            var userName =
                _principalAccessor.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
            if (!string.IsNullOrWhiteSpace(userName))
            {
                var queryable = _userAccountRepository.GetQueryable();
                var userFindTask = queryable.FirstOrDefaultAsync(x => x.UserName.Contains(userName));
                userFindTask.Wait();
                _user = userFindTask.Result;
                if (_user?.Id != null) return _user.Id;
            }

            return new Guid();
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
                var queryable = _userAccountRepository.GetQueryable();
                var userFindTask = queryable.FirstOrDefaultAsync(x => x.UserName.Contains(userName));
                userFindTask.Wait();
                _user = userFindTask.Result;
                if (_user?.Id != null) return _user.IsAdmin;
            }

            return false;
        }
    }
}