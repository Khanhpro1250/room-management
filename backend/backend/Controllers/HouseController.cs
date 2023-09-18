using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.HouseDtos;
using backend.Services.HouseServices;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/house")]
public class HouseController : ControllerBase
{
    private readonly IHouseService _houseService;

    public HouseController( IHouseService houseService)
    {
        _houseService = houseService;
    }

    [HttpGet("index")]
    public async Task<ApiResponse<PaginatedList<HouseDto>>> GetIndexAction()
    {
        var result = await _houseService.GetListHouse();
        return ApiResponse<PaginatedList<HouseDto>>.Ok(result);
    }

    [HttpPost("create")]
    public async Task<ApiResponse<HouseDto>> CrateAction([FromBody] CreateUpdateHouseDto houseDto)
    {
        var result = await _houseService.CreateHouse(houseDto);
        return ApiResponse<HouseDto>.Ok(result);
    }
}