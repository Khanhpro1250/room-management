using backend.Controllers.Dtos.Responese;
using backend.DTOs.ReportDtos;

namespace backend.Services.ReportServices;

public interface IReportService
{
    Task<List<ReportRoomStateDto>> GetReportRoomState(DateTime? filterDateTime);
    Task<List<ReportRoomRevenueDto>> GetReportRoomRevenue(DateTime? filterDateTime);
    Task<List<ReportRoomRevenueDto>> GetReportRoomTotalSpendAmount(DateTime? filterDateTime);
    Task<PaginatedList<ReportContractExpireDto>> GetContractExpired(DateTime? filterDateTime);
}