using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.MenuDtos;
using backend.Models.Entities.Menus;
using backend.Models.Repositorties.MenuRepositories;
using backend.Services.RoleServices;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
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

    public async Task<PaginatedList<MenuDto>> GetListMenus(PaginatedListQuery paginatedListQuery)
    {
        var queryable = _menuRepository.GetQueryable();
        var count = await queryable.CountAsync();
        var listMenu = await queryable
            .ProjectTo<MenuDto>(_mapper.ConfigurationProvider)
            .OrderByDescending(x => x.CreatedTime)
            .QueryablePaging(paginatedListQuery)
            .ToListAsync();
        return new PaginatedList<MenuDto>(listMenu, count, paginatedListQuery.Offset, paginatedListQuery.Limit);
    }

    public async Task<List<MenuLayoutDto>> GetMenuLayout()
    {
        var isAdmin = _currentUser.IsAdmin;
        var roles = await _roleService.GetPermissionWithCurrentUser();
        var queryable = _menuRepository.GetQueryable();

        var menus = await queryable.Where(x => x.IsDisplay).ToListAsync();

        var menuList = menus.Where(x => isAdmin || roles.Any(y => x.Permissions.Split(",").Contains(y.ToString())))
            .ToList();

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
                HasPermissionToAccess = isAdmin || roles.Any(x => menu.Permissions.Contains(x.ToString())),
                CreatedTime = menu.CreatedTime
            });
        }

        return listMenuLayout.OrderBy(x => x.CreatedTime).ToList();
    }

    public async Task<MenuDto> GetDetailMenu(Guid id)
    {
        var menu = await _menuRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(id));
        return _mapper.Map<Menu, MenuDto>(menu);
    }

    public async Task<MenuDto> CreateMenu(CreateUpdateMenuDto menuDto)
    {
        // var checkMenu = await _menuRepository.GetQueryable().FindAsync(x => x.Route.Equals(menuDto.Route));
        // if (checkMenu is not null) throw new Exception("Menu đã tồn tại route");
        if (menuDto.ParentId is not null)
        {
            var parentMenu = await _menuRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id == menuDto.ParentId);
            menuDto.Path = parentMenu?.Path;
        }
        else
        {
            menuDto.Path = menuDto.Id;
        }

        var menu = _mapper.Map<CreateUpdateMenuDto, Menu>(menuDto);

        var result = await _menuRepository.AddAsync(menu, true);
        return _mapper.Map<Menu, MenuDto>(result);
    }

    public async Task<MenuDto> UpdateMenu(CreateUpdateMenuDto menuDto, Guid id)
    {
        var findMenu = await _menuRepository.GetQueryable().AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                       throw new Exception("Không tìm thấy Menu");
        if (menuDto.ParentId is not null)
        {
            var parentMenu = await _menuRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id == menuDto.ParentId);
            menuDto.Path = parentMenu?.Path;
        }
        else
        {
            menuDto.Path = menuDto.Id;
        }

        var updateMenu = _mapper.Map<CreateUpdateMenuDto, Menu>(menuDto);
        var result = await _menuRepository.UpdateAsync(updateMenu, true);
        return _mapper.Map<Menu, MenuDto>(result);
    }

    public async Task DeleteMenu(Guid id)
    {
        var findMenu = await _menuRepository.GetQueryable().AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                       throw new Exception("Không tìm thấy Menu");
        await _menuRepository.DeleteAsync(findMenu, true);
    }

    private List<string> BuildTreeGroup(string path, List<Menu> menus)
    {
        var arrPath = path?.Split(".").Select(Guid.Parse).ToList();
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