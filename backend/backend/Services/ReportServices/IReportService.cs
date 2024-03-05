using backend.Controllers.Dtos.Responese;
using backend.DTOs.ReportDtos;

namespace backend.Services.ReportServices;

public interface IReportService
{
    Task<List<ReportRoomStateDto>> GetReportRoomState(DateTime? filterDateTime);
    Task<List<ReportRoomRevenueDto>> GetReportRoomRevenue(ReportFilterDto filterDto);
    Task<List<ReportRoomRevenueDto>> GetReportRoomTotalSpendAmount(ReportFilterDto filterDto);
    Task<PaginatedList<ReportContractExpireDto>> GetContractExpired(DateTime? filterDateTime);
}