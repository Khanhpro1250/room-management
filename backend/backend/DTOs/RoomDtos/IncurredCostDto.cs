using backend.Models.Entities.Rooms;

namespace backend.DTOs.RoomDtos;

public class IncurredCostDto
{
    public Guid Id { get; set; }
    
    public Guid HouseId { get; set; }
    public Guid RoomId { get; set; }
    public string RoomCode { get; set; }
    public string HouseName { get; set; }
    public decimal Cost { get; set; }
    
    public bool IsPaid { get; set; } 
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public IncurredCostType Type { get; set; }

    public string CreatedBy { get; set; }

    public DateTime? CreatedTime { get; set; }

    public string LastModifiedBy { get; set; }

    public DateTime? LastModifiedTime { get; set; }
}