using backend.Controllers;
using backend.Models.Entities.UserAccount;

namespace backend.Models.Repositorties.UserAccountRepositories;

public interface IUserAccountRepository
{
    Task<List<User>> GetListUser();
    Task<User> GetListUserById(string userId);
    Task<User> CreateUser(test user);
}