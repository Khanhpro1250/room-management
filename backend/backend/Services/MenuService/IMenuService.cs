using backend.Controllers.Dtos.Responese;
using backend.DTOs.MenuDtos;

namespace backend.Services.MenuService;

public interface IMenuService
{
    Task<PaginatedList<MenuDto>> GetListMenus();
    Task<List<MenuLayoutDto>> GetMenuLayout();
    Task<MenuDto> GetDetailMenu(string id);
    Task<MenuDto> CreateMenu(CreateUpdateMenuDto menuDto);
    Task<MenuDto> UpdateMenu(CreateUpdateMenuDto menuDto,string id);
    Task DeleteMenu(string id);
}