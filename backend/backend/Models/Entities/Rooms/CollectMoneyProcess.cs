namespace backend.Models.Entities.Rooms;

public class CollectMoneyProcess : AuditedEntity<Guid>
{
    public Guid CalculateChargeId { get; set; }
    public decimal Money { get; set; }
    public DateTime CollectTime { get; set; }
    public string Description { get; set; }
    
    public CalculateCharge CalculateCharge { get; set; }
    
}