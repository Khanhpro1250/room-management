using backend.Models.Entities.Customers;

namespace backend.Models.Entities.Rooms;

public class RoomServiceIndex : Entity
{
    public Type Type { get; set; }
    public decimal OldElectricValue { get; set; }
    public decimal NewElectricValue { get; set; }
    public decimal UsedElectricValue { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public Guid RoomId { get; set; }
    public Guid CustomerId { get; set; }
    public Room Room { get; set; }
    public Customer Customer { get; set; }
}

public enum Type
{
    Electtric,
    Water
}
