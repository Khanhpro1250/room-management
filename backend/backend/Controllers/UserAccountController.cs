using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserAccountController : ControllerBase
{
    private readonly IUserAccountRepository _userAccountRepository;

    public UserAccountController(IUserAccountRepository userAccountRepository)
    {
        _userAccountRepository = userAccountRepository;
    }
    
    [HttpPost]
    public ActionResult CreateUserCount([FromBody] test user)
    {
        var result = _userAccountRepository.CreateUser(user);
        return new ObjectResult(user);
    }
}