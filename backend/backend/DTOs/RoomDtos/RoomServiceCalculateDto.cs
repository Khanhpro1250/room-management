namespace backend.DTOs.RoomDtos;

public class RoomServiceCalculateDto
{
    public Guid RoomId { get; set; }
    public Guid CustomerId { get; set; }
    public Guid? RoomServiceIndexId { get; set; }
    
    public decimal? RoomCost { get; set; }
    public Guid? IncurredCostId { get; set; }
    public Guid? ServiceId { get; set; }
    public decimal? Cost { get; set; }
}