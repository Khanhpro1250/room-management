using backend.Controllers.Dtos;

namespace backend.DTOs.RoomDtos;

public class RoomFiterDto : PaginatedListQuery
{
    public Guid? HouseId { get; set; }
    public string RoomCode { get; set; }
    public string CustomerName { get; set; }
    public string ContractNo { get; set; }
    public string Status { get; set; }
    public PaginatedListQuery PaginatedListQuery { get; set; }
}