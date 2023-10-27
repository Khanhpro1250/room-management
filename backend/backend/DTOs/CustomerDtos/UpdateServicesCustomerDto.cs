using backend.DTOs.ServiceDtos;
using Newtonsoft.Json;


namespace backend.DTOs.CustomerDtos;

public class UpdateServicesCustomerDto
{
    [JsonProperty("services")] 
    public List<ServiceCustomerDto> Services { get; set; }
}