using backend.DTOs.ContractDtos;
using backend.DTOs.CustomerDtos;
using backend.DTOs.ServiceDtos;

namespace backend.DTOs.RoomDtos;

public class DataWithRoomDto
{
    public CustomerDto Customer { get; set; }
    public List<ServiceDto> Services { get; set; }
    public ContractDto Contract { get; set; }
}