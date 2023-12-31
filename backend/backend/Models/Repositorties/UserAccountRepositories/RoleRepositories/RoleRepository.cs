﻿
using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.UserAccountRepositories.RoleRepositories
{
    public class RoleRepository :EfCoreRepository<ApplicationDbContext, Role>, IRoleRepository
    {
        private readonly ApplicationDbContext _context;
        public RoleRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(serviceProvider,context)
        {
            _context = context;
        }
        // private readonly IMongoCollection<Role> _role;
        // public RoleRepository(IMongoClient client, string databaseName)
        // {
        //     IMongoDatabase database = client.GetDatabase(databaseName);
        //     _role = database.GetCollection<Role>("Role");
        // }
        //
        // public async Task<List<Role>> GetListRole()
        // {
        //     return await _role.Find(item => true).ToListAsync();
        // }
        //
        // public async Task<Role> GetRoleById(string roleId)
        // {
        //     var result = await _role.Find(x => x.Id == roleId).FirstOrDefaultAsync();
        //
        //     return result ?? new Role();
        // }
        //
        // public async Task<Role> CreateRole(Role role)
        // {
        //     await _role.InsertOneAsync(role);
        //     return role;
        // }
        //
        // public async Task<Role> UpdateRole(Role role, string roleId)
        // {
        //     var filter = Builders<Role>.Filter.Eq(x => x.Id, roleId);
        //     await _role.ReplaceOneAsync(filter, role);
        //     return role;
        // }
        //
        // public async Task DeleteRole(string id)
        // {
        //     var filter = Builders<Role>.Filter.Eq(x => x.Id, id);
        //     await _role.DeleteOneAsync(filter);
        // }
        //
        // public IMongoCollection<Role> GetQueryable()
        // {
        //     return _role;
        // }


        public DbSet<Role> GetRepository()
        {
            return _context.Set<Role>();
        }

        IQueryable<Role> IRoleRepository.GetQueryable()
        {
            return GetRepository().AsQueryable();
        }
    }
}
