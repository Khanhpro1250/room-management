using backend.Models.Entities.Menus;
using MongoDB.Driver;

namespace backend.Models.Repositorties.MenuRepositories;

public interface IMenuRepository
{
    Task<Menu> CreateMenu(Menu menu);
    Task<Menu> UpdateMenu(Menu menu, string id);
    Task DeleteMenu(string id);
    Task<List<Menu>> GetListMenu();
    Task<Menu> GetMenuById(string id);
    IMongoCollection<Menu> GetQueryable();
}