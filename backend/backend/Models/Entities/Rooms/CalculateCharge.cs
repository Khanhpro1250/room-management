using backend.Models.Entities.Customers;

namespace backend.Models.Entities.Rooms;

public class CalculateCharge : AuditedEntity<Guid>
{
    public Guid RoomId { get; set; }
    public Guid CustomerId { get; set; }
    public decimal TotalCost { get; set; }
    public decimal TotalPaid { get; set; }
    public decimal TotalUnpaid { get; set; }
    public DateTime DateCalculate { get; set; }

    public Room Room { get; set; }
    public Customer Customer { get; set; }

    public List<CollectMoneyProcess> CollectMoneyProcesses { get; set; }
    public List<CalculateChargeDetail> CalculateChargeDetails { get; set; }
}