using backend.Models.Entities.Services;

namespace backend.Models.Entities.Rooms;

public class CalculateChargeDetail
{
    public Guid Id { get; set; }
    public Guid CalculateChargeId { get; set; }
    public Guid? RoomServiceIndexId { get; set; }

    public decimal RoomCost { get; set; }

    public Guid? ServiceId { get; set; }
    public Guid? IncurredcostId { get; set; }


    public Service Service { get; set; }
    public CalculateCharge CalculateCharge { get; set; }
    public RoomServiceIndex RoomServiceIndex { get; set; }
    public IncurredCost IncurredCost { get; set; }
}