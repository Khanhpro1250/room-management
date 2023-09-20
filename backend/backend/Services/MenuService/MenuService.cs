using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.MenuDtos;
using backend.Models.Entities.Menus;
using backend.Models.Repositorties.MenuRepositories;

using MongoDB.Driver;

namespace backend.Services.MenuService;

public class MenuService :IMenuService
{
    private readonly IMenuRepository _menuRepository;
    private readonly IMapper _mapper;

    public MenuService(IMenuRepository menuRepository, IMapper mapper)
    {
        _menuRepository = menuRepository;
        _mapper = mapper;
    }

    public async Task<PaginatedList<MenuDto>> GetListMenus()
    {
        // var menuList = await _menuRepository.GetListMenu();
        // var result = _mapper.Map<List<Menu>, List<MenuDto>>(menuList);
        var queryable = _menuRepository.GetQueryable();
        var listMenu = await queryable
            .Find(x=> true)
            .ToListAsync();
        
        return new PaginatedList<MenuDto>(_mapper.Map<List<Menu>,List<MenuDto>>(listMenu), listMenu.Count, 0, 10);
            
        
        
        // return new PaginatedList<MenuDto>();
    }

    public async Task<List<MenuLayoutDto>> GetMenuLayout()
    {
        var menuList = await _menuRepository.GetListMenu();
        var listMenuLayout = new List<MenuLayoutDto>();
        foreach (var menu in menuList)
        {
            listMenuLayout.Add(new MenuLayoutDto()
            {
                Key = menu.Id,
                Name = menu.Name,
                Route = menu.Route,
                Icon = menu.Icon,
                ParentKey = menu.ParentId,
                IsDisplay = menu.IsDisplay,
                Level = menu.Level,
                Path = menu.Path,
                BreadCrumbs = BuildTreeGroup(menu.Path,menuList),
                Permissions = menu.Permissions,
                HasPermissionToAccess = true
            });
        }

        return listMenuLayout;
    }

    public async Task<MenuDto> GetDetailMenu(string id)
    {
        var menu = await _menuRepository.GetMenuById(id);
        return _mapper.Map<Menu, MenuDto>(menu);
    }

    public async Task<MenuDto> CreateMenu(CreateUpdateMenuDto menuDto)
    {
        var menu = _mapper.Map<CreateUpdateMenuDto, Menu>(menuDto);
        var result = await _menuRepository.CreateMenu(menu);
        return _mapper.Map<Menu, MenuDto>(result);
    }

    public async Task<MenuDto> UpdateMenu(CreateUpdateMenuDto menuDto, string id)
    {
        var updateMenu = _mapper.Map<CreateUpdateMenuDto, Menu>(menuDto);
        var result = await _menuRepository.UpdateMenu(updateMenu, id);
        return _mapper.Map<Menu, MenuDto>(result);
    }

    public async Task DeleteMenu(string id)
    {
        await _menuRepository.DeleteMenu(id);
    }

    private List<string> BuildTreeGroup(string path, List<Menu> menus)
    {
        var arrPath = path?.Split(".").ToList();
        var groupResponse = new List<string>();

        if (arrPath != null)
            foreach (var id in arrPath)
            {
                var menu = menus.FirstOrDefault(x => x.Id == id)?.Name ?? "";
                groupResponse.Add(menu);
            }

        return groupResponse;
    }
}