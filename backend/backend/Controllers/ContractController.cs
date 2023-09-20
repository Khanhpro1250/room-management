﻿using backend.Controllers.Dtos.Responese;
using backend.Controllers.Dtos;
using backend.DTOs.CustomerDtos;
using backend.Services.CustomerServices;
using Microsoft.AspNetCore.Mvc;
using backend.Services.ContractServices;
using backend.DTOs.ContractDtos;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/contract")]
    public class ContractController
    {
        private readonly IContractService _contractService;

        public ContractController(IContractService contractService)
        {
            _contractService = contractService;
        }


        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<ContractDto>>> GetIndex()
        {
            var result = await _contractService.GetListContract();
            return ApiResponse<PaginatedList<ContractDto>>.Ok(result);
        }


        [HttpGet("detail/{id}")]
        public async Task<ApiResponse<ContractDto>> GetDetail([FromRoute] string id)
        {
            var result = await _contractService.GetContractById(id);
            return ApiResponse<ContractDto>.Ok(result);
        }

        [HttpPost("create")]
        public async Task<ApiResponse<ContractDto>> CreateAction([FromBody] CreateUpdateContractDto contractDto)
        {
            var result = await _contractService.CreateContract(contractDto);
            return ApiResponse<ContractDto>.Ok(result);
        }

        [HttpPut("update/{id}")]
        public async Task<ApiResponse<ContractDto>> UpdateAction([FromBody] CreateUpdateContractDto contractDto, [FromRoute] string id)
        {
            var result = await _contractService.UpdateContract(contractDto, id);
            return ApiResponse<ContractDto>.Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] string id)
        {
            await _contractService.DeleteContract(id);
            return ApiResponse.Ok();
        }
    }
}