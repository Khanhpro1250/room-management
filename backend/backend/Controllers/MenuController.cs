using backend.DTOs.MenuDtos;
using backend.Services.IMenuService;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;
[ApiController]
[Route("api/menu")]
public class MenuController: ControllerBase
{
    private readonly IMenuService _menuService;

    public MenuController(IMenuService menuService)
    {
        _menuService = menuService;
    }


    [HttpGet("index")]
    public async Task<ActionResult<List<MenuDto>>> GetIndex()
    {
        var result = await _menuService.GetListMenus();
        return new ObjectResult(result);
    }
    
    [HttpGet("layout")]
    public async Task<ActionResult> GetMenulayout()
    {
        var result = await _menuService.GetListMenus();
        return new ObjectResult(result);
    }
    
    
    [HttpGet("detail/{id}")]
    public async Task<ActionResult<List<MenuDto>>> GetDetail([FromRoute] string id)
    {
        var result = await _menuService.GetListMenus();
        return new ObjectResult(result);
    }
    
    [HttpPost("create")]
    public async Task<ActionResult<List<MenuDto>>> CreateAction([FromBody] CreateUpdateMenuDto menuDto)
    {
        var result = await _menuService.CreateMenu(menuDto);
        return new ObjectResult(result);
    }
    [HttpPut("update/{id}")]
    public async Task<ActionResult<List<MenuDto>>> UpdateAction([FromBody] CreateUpdateMenuDto menuDto,[FromRoute] string id)
    {
        var result = await _menuService.UpdateMenu(menuDto,id);
        return new ObjectResult(result);
    }
    
    [HttpDelete("delete/{id}")]
    public async Task<ActionResult>DeleteAction([FromRoute] string id)
    {
        await _menuService.DeleteMenu(id);
        return new OkResult();
    }
}