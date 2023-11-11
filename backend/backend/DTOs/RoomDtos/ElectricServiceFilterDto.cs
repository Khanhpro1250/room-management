namespace backend.DTOs.RoomDtos;

public class ElectricServiceFilterDto
{
    public DateTime? CurrentDate { get; set; }
    public string? HouseId { get; set; }
    public Status Status { get; set; } = RoomDtos.Status.All;
}

public enum Status
{
    All,
    Rented,
    New
}