using backend.Controllers.Dtos;

namespace backend.DTOs.RoomDtos;

public class RoomComboOptionDto : ComboOptionDto
{
    public Guid HouseId { get; set; }
}