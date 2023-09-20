﻿using backend.Controllers.Dtos.Responese;
using backend.Controllers.Dtos;
using backend.DTOs.MenuDtos;
using backend.Services.MenuService;
using Microsoft.AspNetCore.Mvc;
using backend.Services.CustomerServices;
using backend.DTOs.CustomerDtos;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }


        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<CustomerDto>>> GetIndex()
        {
            var result = await _customerService.GetListCustomer();
            return ApiResponse<PaginatedList<CustomerDto>>.Ok(result);
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

        [HttpDelete("delete/{id}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] string id)
        {
            await _customerService.DeleteCustomer(id);
            return ApiResponse.Ok();
        }
    }
}