namespace backend.Models.Entities.Customers;

public class PaymentHistory: AuditedEntity<Guid>
{
     public Guid CustomerId { get; set; } 
     public decimal Amount { get; set; }
     public string Description { get; set; }
     public Customer Customer { get; set; }
}