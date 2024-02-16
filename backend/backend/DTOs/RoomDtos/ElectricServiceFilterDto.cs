using backend.Controllers.Dtos;

namespace backend.DTOs.RoomDtos;

public class ElectricServiceFilterDto : PaginatedListQuery
{
    public DateTime CurrentDate { get; set; } = DateTime.Now;
    public Guid? HouseId { get; set; }
    public string RoomCode { get; set; }

    public ServiceType ServiceType { get; set; } = ServiceType.Electric;
}

public enum ServiceType
{
    Electric,
    Water,
}