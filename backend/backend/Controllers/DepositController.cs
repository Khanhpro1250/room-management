using backend.Controllers.Dtos.Responese;
using backend.Controllers.Dtos;
using backend.DTOs.CustomerDtos;
using backend.Services.CustomerServices;
using Microsoft.AspNetCore.Mvc;
using backend.Services.DepositServices;
using backend.DTOs.DepositDtos;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/deposit")]
    public class DepositController : ControllerBase
    {
        // private readonly IDepositService _depositService;
        //
        // public DepositController(IDepositService depositService)
        // {
        //     _depositService = depositService;
        // }
        //
        //
        // [HttpGet("index")]
        // public async Task<ApiResponse<PaginatedList<DepositDto>>> GetIndex()
        // {
        //     var result = await _depositService.GetListDeposit();
        //     return ApiResponse<PaginatedList<DepositDto>>.Ok(result);
        // }
        //
        //
        // [HttpGet("detail/{id}")]
        // public async Task<ApiResponse<DepositDto>> GetDetail([FromRoute] string id)
        // {
        //     var result = await _depositService.GetDepositById(id);
        //     return ApiResponse<DepositDto>.Ok(result);
        // }
        //
        // [HttpPost("create")]
        // public async Task<ApiResponse<DepositDto>> CreateAction([FromBody] CreateUpdateDepositDto depositDto)
        // {
        //     var result = await _depositService.CreateDeposit(depositDto);
        //     return ApiResponse<DepositDto>.Ok(result);
        // }
        //
        // [HttpPut("update/{id}")]
        // public async Task<ApiResponse<DepositDto>> UpdateAction([FromBody] CreateUpdateDepositDto depositDto, [FromRoute] string id)
        // {
        //     var result = await _depositService.UpdateDeposit(depositDto, id);
        //     return ApiResponse<DepositDto>.Ok(result);
        // }
        //
        // [HttpDelete("delete/{id}")]
        // public async Task<ApiResponse> DeleteAction([FromRoute] string id)
        // {
        //     await _depositService.DeleteDeposit(id);
        //     return ApiResponse.Ok();
        // }
    }
}
