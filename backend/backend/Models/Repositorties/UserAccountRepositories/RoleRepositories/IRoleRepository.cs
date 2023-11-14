
using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.UserAccountRepositories.RoleRepositories
{
    public interface IRoleRepository : IRepository<Role>
    {
        DbSet<Role> GetRepository();
        IQueryable<Role> GetQueryable();
    }
}
