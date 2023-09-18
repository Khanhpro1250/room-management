using AutoMapper;
using backend.Models.Entities.Menus;
using MongoDB.Driver;

namespace backend.Models.Repositorties.MenuRepositories;

public class MenuRepository : IMenuRepository
{
    private readonly IMongoCollection<Menu> _menu;

    public MenuRepository(IMongoClient client, string databaseName)
    {
        IMongoDatabase database = client.GetDatabase(databaseName);
        _menu = database.GetCollection<Menu>("Menu");
    }

    public async Task<Menu> CreateMenu(Menu menu)
    {
        await _menu.InsertOneAsync(menu);
        return menu;
    }

    public async Task<Menu> UpdateMenu(Menu menu, string id)
    {
        var filter = Builders<Menu>.Filter.Eq(x => x.Id, id);
        await _menu.ReplaceOneAsync(filter, menu);
        return menu;
    }

    public async Task DeleteMenu(string id)
    {
        var filter = Builders<Menu>.Filter.Eq(x => x.Id, id);
        await _menu.DeleteOneAsync(filter);
    }

    public async Task<List<Menu>> GetListMenu()
    {
        return await _menu.Find(item => true).ToListAsync();
    }

    public async Task<Menu> GetMenuById(string id)
    {
        var result = await _menu.Find(x => x.Id == id).FirstOrDefaultAsync();

        return result ?? new Menu();
    }

    public IMongoCollection<Menu> GetQueryable()
    {
        return _menu;
    }
}