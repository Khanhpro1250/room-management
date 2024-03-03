namespace backend.DTOs.CustomerDtos;

public class PaymentHistoryDto
{
    public Guid CustomerId { get; set; }
    public string CustomerName { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public DateTime CreatedTime { get; set; }
}