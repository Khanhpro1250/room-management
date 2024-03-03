using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ReportDtos;
using backend.Services.ReportServices;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/report")]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet("room-state")]
    public async Task<ApiResponse<List<ReportRoomStateDto>>> GetRoomState()
    {
        var result = await _reportService.GetReportRoomState(null);
        return ApiResponse<List<ReportRoomStateDto>>.Ok(result);
    }

    [HttpGet("room-revenue")]
    public async Task<ApiResponse<List<ReportRoomRevenueDto>>> GetRoomRevenue()
    {
        var result = await _reportService.GetReportRoomRevenue(DateTime.Now);
        return ApiResponse<List<ReportRoomRevenueDto>>.Ok(result);
    }

    [HttpGet("total-spend-amount")]
    public async Task<ApiResponse<List<ReportRoomRevenueDto>>> ReportRoomTotalSpendAmount()
    {
        var result = await _reportService.GetReportRoomTotalSpendAmount(DateTime.Now);
        return ApiResponse<List<ReportRoomRevenueDto>>.Ok(result);
    }

    [HttpGet("contract-expire")]
    public async Task<ApiResponse<PaginatedList<ReportContractExpireDto>>> GetListCustomerAboutContractExpire()
    {
        var result = await _reportService.GetContractExpired(DateTime.Now);
        return ApiResponse<PaginatedList<ReportContractExpireDto>>.Ok(result);
    }
}