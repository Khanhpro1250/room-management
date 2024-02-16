namespace backend.DTOs.RoomDtos;

public class RoomProcessDto
{
    public Guid RoomId { get; set; }

    public Guid CustomerId { get; set; }
    public string CustomerName { get; set; }
    public string RoomCode { get; set; }
    public string HouseName { get; set; }

    public string Status { get; set; }

    public string Action { get; set; }

    public string ActionName { get; set; }

    public string Note { get; set; }

    public string CreatedBy { get; set; }

    public DateTime? CreatedTime { get; set; }

    public string LastModifiedBy { get; set; }

    public DateTime? LastModifiedTime { get; set; }
}