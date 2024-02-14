using backend.Controllers.Dtos;

namespace backend.DTOs.RoomDtos;

public class ElectricServiceFilterDto : PaginatedListQuery
{
    public DateTime CurrentDate { get; set; } = DateTime.Now;
    public Guid? HouseId { get; set; }
    public Status Status { get; set; } = RoomDtos.Status.All;

    public ServiceType ServiceType { get; set; } = ServiceType.Electric;
}

public enum Status
{
    All,
    Rented,
    New
}

public enum ServiceType
{
    Electric,
    Water,
}