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

    [HttpPost("create")]
    public async Task<ActionResult<HouseDto>> CrateAction([FromBody] CreateUpdateHouseDto houseDto)
    {
        var result = await _houseService.CreateHouse(houseDto);
        return new ObjectResult(result);
    }
}