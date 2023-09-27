using backend.Controllers.Dtos;

namespace backend.DTOs.RoomDtos;

public class RoomFilterDto : PaginatedFilterDto
{
    public string HouseId { get; set; }
    public string RoomCode { get; set; }
    public string CustomerName { get; set; }
    public string ContractNo { get; set; }
    public string Status { get; set; }
}