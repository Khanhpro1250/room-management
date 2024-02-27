namespace backend.DTOs.RoomDtos;

public class FilterComboRoomDto
{
    public Guid? HouseId { get; set; }
    public Guid? RoomId { get; set; }
    public bool IsComboDeposit { get; set; }
}