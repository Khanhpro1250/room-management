using backend.Models.Entities.Rooms;

namespace backend.DTOs.RoomDtos;

public class CreateIncurredCostDto
{
    public string RoomId { get; set; }
    public string HouseId { get; set; }
    public decimal Cost { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public IncurredCostType Type { get; set; } = IncurredCostType.Owner;
}