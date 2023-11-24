namespace backend.DTOs.RoomDtos;

public class RoomElectricServiceDto
{
    public Guid RoomId { get; set; }
    public Guid CustomerId { get; set; }
    public string RoomCode { get; set; }
    public string HouseName { get; set; }
    public string CustomerName { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public float OldElectricValue { get; set; }
    public float NewElectricValue { get; set; }
    public float UsedElectricValue { get; set; }
}