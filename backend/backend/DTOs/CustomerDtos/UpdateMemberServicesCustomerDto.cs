using backend.DTOs.ServiceDtos;
using Newtonsoft.Json;


namespace backend.DTOs.CustomerDtos;

public class UpdateMemberServicesCustomerDto
{
    [JsonProperty("services")] public List<ServiceCustomerDto> Services { get; set; } = new List<ServiceCustomerDto>();

    [JsonProperty("members")] public List<MemberDto> Members { get; set; } = new List<MemberDto>();
}