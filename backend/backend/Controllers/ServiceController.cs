using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ServiceDtos;
using backend.Services.ServiceServices;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/service")]
    public class ServiceController: ControllerBase
    {
        private readonly IServiceService _serviceService;
        
        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }
        
        
        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<ServiceDto>>> GetIndex()
        {
            var result = await _serviceService.GetListService(Request.Query.GetPaginatedListQuery());
            return ApiResponse<PaginatedList<ServiceDto>>.Ok(result);
        }
        
        
        [HttpGet("detail/{id:guid}")]
        public async Task<ApiResponse<ServiceDto>> GetDetail([FromRoute] Guid id)
        {
            var result = await _serviceService.GetServiceById(id);
            return ApiResponse<ServiceDto>.Ok(result);
        }
        
        [HttpPost("create")]
        public async Task<ApiResponse<ServiceDto>> CreateAction([FromBody] CreateUpdateServiceDto serviceDto)
        {
            var result = await _serviceService.CreateService(serviceDto);
            return ApiResponse<ServiceDto>.Ok(result);
        }
        
        [HttpPut("update/{id:guid}")]
        public async Task<ApiResponse<ServiceDto>> UpdateAction([FromBody] CreateUpdateServiceDto serviceDto, [FromRoute] Guid id)
        {
            var result = await _serviceService.UpdateService(serviceDto, id);
            return ApiResponse<ServiceDto>.Ok(result);
        }
        
        [HttpDelete("delete/{id:guid}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] Guid id)
        {
            await _serviceService.DeleteService(id);
            return ApiResponse.Ok();
        }
    }
}
