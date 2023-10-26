using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.MenuDtos;
using backend.Models.Entities.Menus;
using backend.Models.Repositorties.MenuRepositories;
using backend.Services.RoleServices;
using backend.Services.UserServices;
using MongoDB.Driver;

namespace backend.Services.MenuService;

public class MenuService : IMenuService
{
    private readonly IMenuRepository _menuRepository;
    private readonly IMapper _mapper;
    private readonly IRoleService _roleService;
    private readonly ICurrentUser _currentUser;

    public MenuService(IMenuRepository menuRepository, IMapper mapper, IRoleService roleService,
        ICurrentUser currentUser)
    {
        _menuRepository = menuRepository;
        _mapper = mapper;
        _roleService = roleService;
        _currentUser = currentUser;
    }

    public async Task<PaginatedList<MenuDto>> GetListMenus()
    {
        var queryable = _menuRepository.GetQueryable();
        var listMenu = await queryable
            .Find(x => true)
            .ToListAsync();
        return new PaginatedList<MenuDto>(_mapper.Map<List<Menu>, List<MenuDto>>(listMenu), listMenu.Count, 0, 10);
    }

    public async Task<List<MenuLayoutDto>> GetMenuLayout()
    {
        var isAdmin = _currentUser.IsAdmin;
        var roles = await _roleService.GetPermissionWithCurrentUser();
        var queryable = _menuRepository.GetQueryable();

        var menuList = await queryable.Find(x => isAdmin || roles.Contains(x.Permissions)).ToListAsync();

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
                BreadCrumbs = BuildTreeGroup(menu.Path, menuList),
                Permissions = menu.Permissions,
                HasPermissionToAccess = isAdmin || roles.Contains(menu.Permissions)
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
        // var checkMenu = await _menuRepository.GetQueryable().FindAsync(x => x.Route.Equals(menuDto.Route));
        // if (checkMenu is not null) throw new Exception("Menu đã tồn tại route");
        if (menuDto.ParentId is not null)
        {
            var parentMenu = await _menuRepository.GetQueryable().Find(x => x.Id == menuDto.ParentId)
                .FirstOrDefaultAsync();
            menuDto.Path = parentMenu.Path;
        }
        else
        {
            menuDto.Path = menuDto.Id;
        }

        var menu = _mapper.Map<CreateUpdateMenuDto, Menu>(menuDto);
        var result = await _menuRepository.CreateMenu(menu);
        return _mapper.Map<Menu, MenuDto>(result);
    }

    public async Task<MenuDto> UpdateMenu(CreateUpdateMenuDto menuDto, string id)
    {
        if (menuDto.ParentId is not null)
        {
            var parentMenu = await _menuRepository.GetQueryable().Find(x => x.Id == menuDto.ParentId)
                .FirstOrDefaultAsync();
            menuDto.Path = parentMenu.Path;
        }
        else
        {
            menuDto.Path = menuDto.Id;
        }

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