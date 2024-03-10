namespace backend.DTOs.RoomDtos;

public class CalculateChargeMobileDto
{
    public Guid Id { get; set; }
    public string RoomCode { get; set; }
    public string HouseName { get; set; }
    public Guid HouseId { get; set; }
    public string CustomerName { get; set; }
    public decimal TotalCost { get; set; }
    public decimal TotalPaid { get; set; }
    public decimal TotalUnpaid { get; set; }
    public string Status { get; set; }
    public string StatusName { get; set; }

    public DateTime? LastDateCollectMoney { get; set; }

    public DateTime DateCalculate { get; set; }

    public string FromDate { get; set; }
    public string ToDate { get; set; }
    public string MonthDate { get; set; }

    public string CreatedBy { get; set; }

    public DateTime? CreatedTime { get; set; }

    public string LastModifiedBy { get; set; }

    public DateTime? LastModifiedTime { get; set; }
    public bool IsCurrent { get; set; }
}