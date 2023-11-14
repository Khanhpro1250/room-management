using backend.Models.Entities.Menus;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Models.Repositorties.MenuRepositories;

public interface IMenuRepository: IRepository<Menu>
{
    // Task<Menu> CreateMenu(Menu menu);
    // Task<Menu> UpdateMenu(Menu menu, string id);
    // Task DeleteMenu(string id);
    // Task<List<Menu>> GetListMenu();
    // Task<Menu> GetMenuById(string id);
    // IMongoCollection<Menu> GetQueryable();
    
    DbSet<Menu> GetRepository();
    IQueryable<Menu> GetQueryable();
}