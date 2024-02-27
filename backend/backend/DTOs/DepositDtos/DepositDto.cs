namespace backend.DTOs.DepositDtos;

public class DepositDto
{
    public Guid Id { get; set; }

    public Guid RoomId { get; set; }

    public Guid HouseId { get; set; }
    public string RoomCode { get; set; }
    public string HouseName { get; set; }
    public string CustomerName { get; set; }
    public string PhoneNumber { get; set; }
    public decimal DepositAmount { get; set; }
    public DateTime? ExpectedDate { get; set; }
    public DateTime DepositDate { get; set; }
    public int MaximumDays { get; set; }
    public string Note { get; set; }
    public string Status { get; set; }
    public string StatusName { get; set; }
}