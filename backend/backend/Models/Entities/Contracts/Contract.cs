using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;

namespace backend.Models.Entities.Contracts
{
    public class Contract : AuditedEntity<Guid>
    {
        public string ContractNumber { get; set; }
        public Guid RoomId { get; set; }
        public Guid CustomerId { get; set; }
        public int Month { get; set; }
        public DateTime? SignedDate { get; set; }
        public DateTime? EffectDate { get; set; }
        public DateTime? ExpiredDate { get; set; }

        public bool IsEarly { get; set; } = false;
        public DateTime? CheckOutDate { get; set; }

        #region ref

        public Room Room { get; set; }
        public Customer Customer { get; set; }

        #endregion
    }
}