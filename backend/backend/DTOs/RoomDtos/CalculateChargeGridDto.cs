namespace backend.DTOs.RoomDtos;

public class CalculateChargeGridDto
{
    public Guid Id { get; set; }
    public string RoomCode { get; set; }
    public string HouseName { get; set; }
    public string CustomerName { get; set; }
    public decimal TotalCost { get; set; }
    public decimal TotalPaid { get; set; }
    public decimal TotalUnpaid { get; set; }

    public DateTime? LastDateCollectMoney { get; set; }

    public DateTime DateCalculate { get; set; }

    public string CreatedBy { get; set; }

    public DateTime? CreatedTime { get; set; }

    public string LastModifiedBy { get; set; }

    public DateTime? LastModifiedTime { get; set; }
}