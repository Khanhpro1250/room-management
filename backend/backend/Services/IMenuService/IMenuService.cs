using backend.DTOs.MenuDtos;

namespace backend.Services.IMenuService;

public interface IMenuService
{
    Task<List<MenuDto>> GetListMenus();
    Task<List<MenuLayoutDto>> GetMenuLayout();
    Task<MenuDto> GetDetailMenu(string id);
    Task<MenuDto> CreateMenu(CreateUpdateMenuDto menuDto);
    Task<MenuDto> UpdateMenu(CreateUpdateMenuDto menuDto,string id);
    Task DeleteMenu(string id);
}