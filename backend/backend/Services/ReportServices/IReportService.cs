using backend.DTOs.ReportDtos;

namespace backend.Services.ReportServices;

public interface IReportService
{
    Task<List<ReportRoomStateDto>> GetReportRoomState(DateTime? filterDateTime);
    Task<List<ReportRoomRevenueDto>> GetReportRoomRevenue(DateTime? filterDateTime);
}