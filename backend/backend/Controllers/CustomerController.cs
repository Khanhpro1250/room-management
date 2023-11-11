using System.Runtime.InteropServices.ComTypes;
using backend.Controllers.Dtos.Responese;
using backend.Controllers.Dtos;
using backend.DTOs.MenuDtos;
using backend.Services.MenuService;
using Microsoft.AspNetCore.Mvc;
using backend.Services.CustomerServices;
using backend.DTOs.CustomerDtos;
using backend.DTOs.ServiceDtos;
using backend.Services.ExportWordPdfServices;
using backend.Services.RoomServices;
using backend.Utils;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly IExportService _exportService;
        private readonly IRoomService _roomService;

        public CustomerController(ICustomerService customerService, IExportService exportService, IRoomService roomService)
        {
            _customerService = customerService;
            _exportService = exportService;
            _roomService = roomService;
        }


        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<CustomerDto>>> GetIndex()
        {
            var result = await _customerService.GetListCustomer();
            return ApiResponse<PaginatedList<CustomerDto>>.Ok(result);
        }
        
        
        [HttpGet("detail-by-room/{roomId}")]
        public async Task<ApiResponse<CustomerDto>> GetDetailByRoomId([FromRoute] string roomId)
        {
            var result = await _customerService.GetCustomerByRoomId(roomId);
            return ApiResponse<CustomerDto>.Ok(result);
        }


        [HttpGet("detail/{id}")]
        public async Task<ApiResponse<CustomerDto>> GetDetail([FromRoute] string id)
        {
            var result = await _customerService.GetCustomerById(id);
            return ApiResponse<CustomerDto>.Ok(result);
        }

        [HttpPost("create")]
        public async Task<ApiResponse<CustomerDto>> CreateAction([FromBody] CreateUpdateCustomerDto customerDto)
        {
            var result = await _customerService.CreateCustomer(customerDto);
            return ApiResponse<CustomerDto>.Ok(result);
        }

        [HttpPut("update/{id}")]
        public async Task<ApiResponse<CustomerDto>> UpdateAction([FromBody] CreateUpdateCustomerDto customerDto, [FromRoute] string id)
        {
            var result = await _customerService.UpdateCustomer(customerDto, id);
            return ApiResponse<CustomerDto>.Ok(result);
        }
        
        [HttpPut("update-member-service-customer/{id}")]
        public async Task<ApiResponse<CustomerDto>> UpdateServiceCustomerAction([FromBody] UpdateMemberServicesCustomerDto updateMemberServicesCustomerDto, [FromRoute] string id)
        {
            var result = await _customerService.UpdateMemberServiceCustomer(updateMemberServicesCustomerDto, id);
            return ApiResponse<CustomerDto>.Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] string id)
        {
            await _customerService.DeleteCustomer(id);
            return ApiResponse.Ok();
        }
    }
}
