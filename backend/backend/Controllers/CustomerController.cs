﻿using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.Services.CustomerServices;
using backend.Services.ExportWordPdfServices;
using backend.Services.RoomServices;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly IExportService _exportService;
        private readonly IRoomService _roomService;

        public CustomerController(ICustomerService customerService, IExportService exportService,
            IRoomService roomService)
        {
            _customerService = customerService;
            _exportService = exportService;
            _roomService = roomService;
        }


        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<CustomerDto>>> GetIndex()
        {
            var result = await _customerService.GetListCustomer(Request.Query.GetPaginatedListQuery());
            return ApiResponse<PaginatedList<CustomerDto>>.Ok(result);
        }


        [HttpGet("detail-by-room/{roomId}")]
        public async Task<ApiResponse<CustomerDto>> GetDetailByRoomId([FromRoute] Guid roomId)
        {
            var result = await _customerService.GetCustomerByRoomId(roomId);
            return ApiResponse<CustomerDto>.Ok(result);
        }


        [HttpGet("detail/{id:guid}")]
        public async Task<ApiResponse<CustomerDto>> GetDetail([FromRoute] Guid id)
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

        [HttpPut("update/{id:guid}")]
        public async Task<ApiResponse<CustomerDto>> UpdateAction([FromBody] CreateUpdateCustomerDto customerDto,
            [FromRoute] Guid id)
        {
            var result = await _customerService.UpdateCustomer(customerDto, id);
            return ApiResponse<CustomerDto>.Ok(result);
        }

        [HttpPut("update-member-service-customer/{id:guid}")]
        public async Task<ApiResponse<CustomerDto>> UpdateServiceCustomerAction(
            [FromBody] UpdateMemberServicesCustomerDto updateMemberServicesCustomerDto, [FromRoute] Guid id)
        {
            var result = await _customerService.UpdateMemberServiceCustomer(updateMemberServicesCustomerDto, id);
            return ApiResponse<CustomerDto>.Ok(result);
        }

        [HttpDelete("delete/{id:guid}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] Guid id)
        {
            await _customerService.DeleteCustomer(id);
            return ApiResponse.Ok();
        }
    }
}