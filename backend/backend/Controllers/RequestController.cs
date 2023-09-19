using backend.Controllers.Dtos.Responese;
using backend.Controllers.Dtos;
using Microsoft.AspNetCore.Mvc;
using backend.Services.RequestServices;
using backend.DTOs.RequestDtos;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/request")]
    public class RequestController
    {
        private readonly IRequestService _requestService;

        public RequestController(IRequestService requestService)
        {
            _requestService = requestService;
        }


        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<RequestDto>>> GetIndex()
        {
            var result = await _requestService.GetListRequest();
            return ApiResponse<PaginatedList<RequestDto>>.Ok(result);
        }


        [HttpGet("detail/{id}")]
        public async Task<ApiResponse<RequestDto>> GetDetail([FromRoute] string id)
        {
            var result = await _requestService.GetRequestById(id);
            return ApiResponse<RequestDto>.Ok(result);
        }

        [HttpPost("create")]
        public async Task<ApiResponse<RequestDto>> CreateAction([FromBody] CreateUpdateRequestDto requestDto)
        {
            var result = await _requestService.CreateRequest(requestDto);
            return ApiResponse<RequestDto>.Ok(result);
        }

        [HttpPut("update/{id}")]
        public async Task<ApiResponse<RequestDto>> UpdateAction([FromBody] CreateUpdateRequestDto requestDto, [FromRoute] string id)
        {
            var result = await _requestService.UpdateRequest(requestDto, id);
            return ApiResponse<RequestDto>.Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] string id)
        {
            await _requestService.DeleteRequest(id);
            return ApiResponse.Ok();
        }
    }
}
