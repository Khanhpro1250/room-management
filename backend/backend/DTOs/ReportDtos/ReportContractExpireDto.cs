namespace backend.DTOs.ReportDtos;

public class ReportContractExpireDto
{
    public Guid CustomerId { get; set; }
    public string CustomerName { get; set; }
    public DateTime? ExpiredDate { get; set; }
    public string CustomerEmail { get; set; }
    public string HouseName { get; set; }
    public string RoomCode { get; set; }
    public string ContractNumber { get; set; }
    public double NumberOfDayToExpire { get; set; }
}