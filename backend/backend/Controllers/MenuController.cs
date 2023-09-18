using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.MenuDtos;
using backend.Services.MenuService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/menu")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menuService;

    public MenuController(IMenuService menuService)
    {
        _menuService = menuService;
    }


    [HttpGet("index")]
    public async Task<ApiResponse<PaginatedList<MenuDto>>> GetIndex()
    {
        var result = await _menuService.GetListMenus();
        return ApiResponse<PaginatedList<MenuDto>>.Ok(result);
    }

    [HttpGet("layout")]
    public async Task<ApiResponse<List<MenuLayoutDto>>> GetMenulayout()
    {
        var result = await _menuService.GetMenuLayout();
        return ApiResponse<List<MenuLayoutDto>>.Ok(result);
    }


    [HttpGet("detail/{id}")]
    public async Task<ApiResponse<MenuDto>> GetDetail([FromRoute] string id)
    {
        var result = await _menuService.GetDetailMenu(id);
        return ApiResponse<MenuDto>.Ok(result);
    }

    [HttpPost("create")]
    public async Task<ApiResponse<MenuDto>> CreateAction([FromBody] CreateUpdateMenuDto menuDto)
    {
        var result = await _menuService.CreateMenu(menuDto);
        return ApiResponse<MenuDto>.Ok(result);
    }

    [HttpPut("update/{id}")]
    public async Task<ApiResponse<MenuDto>> UpdateAction([FromBody] CreateUpdateMenuDto menuDto, [FromRoute] string id)
    {
        var result = await _menuService.UpdateMenu(menuDto, id);
        return ApiResponse<MenuDto>.Ok(result);
    }

    [HttpDelete("delete/{id}")]
    public async Task<ApiResponse> DeleteAction([FromRoute] string id)
    {
        await _menuService.DeleteMenu(id);
        return ApiResponse.Ok();
    }
}