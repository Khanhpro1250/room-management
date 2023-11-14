using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.MenuDtos;

namespace backend.Services.MenuService;

public interface IMenuService
{
    Task<PaginatedList<MenuDto>> GetListMenus(PaginatedListQuery paginatedListQuery);
    Task<List<MenuLayoutDto>> GetMenuLayout();
    Task<MenuDto> GetDetailMenu(Guid id);
    Task<MenuDto> CreateMenu(CreateUpdateMenuDto menuDto);
    Task<MenuDto> UpdateMenu(CreateUpdateMenuDto menuDto,Guid id);
    Task DeleteMenu(Guid id);
}