using backend.Controllers.Dtos;
using backend.Models.Entities.Rooms;

namespace backend.DTOs.RoomDtos;

public class IncurredCostFilterDto
{
    public Guid? HouseId { get; set; }
    public Guid? RoomId { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public IncurredCostType? Type { get; set; }
    
    public string RoomCode { get; set; }
    
    public PaginatedListQuery PaginatedListQuery { get; set; }
}