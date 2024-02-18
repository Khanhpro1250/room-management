using backend.Controllers.Dtos;
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
}