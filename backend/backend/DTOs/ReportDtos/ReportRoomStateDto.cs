namespace backend.DTOs.ReportDtos;

public class ReportRoomStateDto
{
    public Guid Id { get; set; }
    public string RoomCode { get; set; }
    public string HouseName { get; set; }
    public string StatusCode { get; set; }
    public string StatusName { get; set; }
}