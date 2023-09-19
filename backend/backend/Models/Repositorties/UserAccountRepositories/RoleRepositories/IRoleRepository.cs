
using backend.Models.Entities.UserAccount;
using MongoDB.Driver;

namespace backend.Models.Repositorties.UserAccountRepositories.RoleRepositories
{
    public interface IRoleRepository
    {
        Task<List<Role>> GetListRole();
        Task<Role> GetRoleById(string roleId);
        Task<Role> CreateRole(Role role);
        Task<Role> UpdateRole(Role role, string id);
        IMongoCollection<Role> GetQueryable();
        Task DeleteRole(string id);
    }
}
