using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;

namespace backend.Models.Entities.Deposits;

public class Deposit : AuditedEntity<Guid>
{
    public Guid RoomId { get; set; }
    public string CustomerName { get; set; }
    public string PhoneNumber { get; set; }
    public decimal DepositAmount { get; set; }
    public DateTime DepositDate { get; set; }
    public string Note { get; set; }
    public Guid? CustomerId { get; set; }

    /// <summary>
    /// Ngày dự kiến nhận phòng
    /// </summary>
    public DateTime? ExpectedDate { get; set; }

    public int MaximumDays { get; set; }
    public string Status { get; set; }
    public Room Room { get; set; }
    public Customer Customer { get; set; }
}