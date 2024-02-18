using backend.Models.Entities.Services;

namespace backend.Models.Entities.Rooms;

public class RoomServiceIndex : AuditedEntity<Guid>
{
    public Guid ServiceId { get; set; }
    public decimal OldElectricValue { get; set; }
    public decimal NewElectricValue { get; set; }
    public decimal UsedElectricValue { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public Guid RoomId { get; set; }
    public Room Room { get; set; }
    public Service Service { get; set; }
}