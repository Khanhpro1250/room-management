namespace backend.Models.Entities.Rooms;

/// <summary>
/// Chi phí phát sinh
/// </summary>
public class IncurredCost : AuditedEntity<Guid>
{
    public Guid RoomId { get; set; }
    public Room Room { get; set; }
    public decimal Cost { get; set; }

    public bool IsPaid { get; set; } = false;
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public IncurredCostType Type { get; set; }
}

public enum IncurredCostType
{
    Owner,
    Customer
}