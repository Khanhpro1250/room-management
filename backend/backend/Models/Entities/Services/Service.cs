using backend.Models.Entities.Customers;

namespace backend.Models.Entities.Services
{
    public class Service : AuditedEntity<Guid>
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }

        public float Price { get; set; }

        // [JsonProperty("unit")] 
        public string Unit { get; set; }
        public bool Status { get; set; }
    }

    public class ServiceCustomer
    {
        public Guid ServiceId { get; set; }
        public Guid CustomerId { get; set; }
        public float Quantity { get; set; }
        public float Price { get; set; }

        #region ref

        public Service Service { get; set; }
        public Customer Customer { get; set; }

        #endregion
    }
}