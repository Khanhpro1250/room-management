namespace backend.DTOs.RoomDtos;

public class CalculateChargeFilterDto
{
    public DateTime DateTime { get; set; } = DateTime.Now;
    public Guid? HouseId { get; set; }
    public Guid? RoomId { get; set; }
    public string RoomCode { get; set; }
}