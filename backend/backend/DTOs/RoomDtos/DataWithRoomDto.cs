using backend.DTOs.ContractDtos;
using backend.DTOs.CustomerDtos;
using backend.DTOs.ServiceDtos;

namespace backend.DTOs.RoomDtos;

public class DataWithRoomDto
{
    public RoomDto Room { get; set; }
    public CustomerDto Customer { get; set; }
    public List<ServiceDto> ListServices { get; set; }
    public List<ServiceCustomerDto> Services { get; set; }
    public List<MemberDto> Members { get; set; }
    public ContractDto Contract { get; set; }
}