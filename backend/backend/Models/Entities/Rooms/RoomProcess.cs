using backend.Models.Entities.Customers;

namespace backend.Models.Entities.Rooms;

public class RoomProcess: AuditedEntity<Guid>
{
    public Guid RoomId { get; set; }
    public Guid CustomerId { get; set; }
    public string Status { get; set; }
    public string Action { get; set; }
    public string Note { get; set; }
    public Room Room { get; set; }
    public Customer Customer { get; set; }
}