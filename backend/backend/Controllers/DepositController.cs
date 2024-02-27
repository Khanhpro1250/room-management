using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.DepositDtos;
using backend.Services.DepositServices;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/deposit")]
    public class DepositController : ControllerBase
    {
        private readonly IDepositService _depositService;
        
        public DepositController(IDepositService depositService)
        {
            _depositService = depositService;
        }
        
        
        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<DepositDto>>> GetIndex()
        {
            var result = await _depositService.GetListDeposit(paginatedListQuery: new PaginatedListQuery());
            return ApiResponse<PaginatedList<DepositDto>>.Ok(result);
        }
        
        
        // [HttpGet("detail/{id}")]
        // public async Task<ApiResponse<DepositDto>> GetDetail([FromRoute] string id)
        // {
        //     var result = await _depositService.GetDepositById(id);
        //     return ApiResponse<DepositDto>.Ok(result);
        // }
        
        [HttpPost("create")]
        public async Task<ApiResponse> CreateAction([FromBody] CreateUpdateDepositDto depositDto)
        {
           await _depositService.CreateDeposit(depositDto);
            return ApiResponse.Ok();
        }
        
        [HttpPut("update/{id}")]
        public async Task<ApiResponse> UpdateAction([FromBody] CreateUpdateDepositDto depositDto, [FromRoute] Guid id)
        {
            await _depositService.UpdateDeposit(depositDto, id);
            return ApiResponse.Ok();
        }
        
        [HttpDelete("delete/{id}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] Guid id)
        {
            await _depositService.DeleteDeposit(id);
            return ApiResponse.Ok();
        }
    }
}
