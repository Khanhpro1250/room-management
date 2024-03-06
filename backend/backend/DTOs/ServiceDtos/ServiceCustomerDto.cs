namespace backend.DTOs.ServiceDtos;

public class ServiceCustomerDto
{
    public string ServiceId { get; set; }
    public float Quantity { get; set; }
    public float Price { get; set; }
    public string ServiceName { get; set; }
    public string ServiceCode { get; set; }
    public string ServiceUnit { get; set; }
}