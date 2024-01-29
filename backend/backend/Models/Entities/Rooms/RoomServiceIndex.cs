using backend.Models.Entities.Customers;
using backend.Models.Entities.Services;

namespace backend.Models.Entities.Rooms;

public class RoomServiceIndex : Entity
{
    public Guid ServiceId { get; set; }
    public decimal OldElectricValue { get; set; }
    public decimal NewElectricValue { get; set; }
    public decimal UsedElectricValue { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public Guid RoomId { get; set; }
    public Guid CustomerId { get; set; }
    public Room Room { get; set; }
    public Customer Customer { get; set; }
    public Service Service { get; set; }
}