namespace backend.DTOs.RoomDtos;

public class UpdateCalculateChargeDto
{
    public Guid Id { get; set; }
    public DateTime DateCollectMoney { get; set; }
    public decimal MoneyCollect { get; set; }
}