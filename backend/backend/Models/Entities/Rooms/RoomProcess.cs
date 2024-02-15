using backend.Models.Entities.Customers;

namespace backend.Models.Entities.Rooms;

public class RoomProcess
{
    public Guid Id { get; set; }
    public Guid RoomId { get; set; }
    public Guid CustomerId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string Status { get; set; }
    public string Note { get; set; }
    public Room Room { get; set; }
    public Customer Customer { get; set; }
}