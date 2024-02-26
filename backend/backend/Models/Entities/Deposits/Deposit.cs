using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;

namespace backend.Models.Entities.Deposits;

public class Deposit : AuditedEntity<Guid>
{
    public Guid RoomId { get; set; }
    public string CustomerName { get; set; }
    public string PhoneNumber { get; set; }
    public float DepositAmount { get; set; }
    public DateTime ExpectedDate { get; set; }
    public int MaximunDays { get; set; }
    public string Status { get; set; }
    public Room Room { get; set; }
}