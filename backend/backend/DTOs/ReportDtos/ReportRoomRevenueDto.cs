namespace backend.DTOs.ReportDtos;

public class ReportRoomRevenueDto
{
    public MonthDto Month { get; set; }
    public List<ReportRevenueDetailDto> Details { get; set; }
}

public class ReportRevenueDetailDto
{
    public Guid HouseId { get; set; }
    public string HouseName { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public decimal Revenue { get; set; }
}

public class MonthDto
{
    public int Month { get; set; }
    public int Year { get; set; }
}