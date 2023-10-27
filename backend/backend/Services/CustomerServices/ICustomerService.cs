using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;
using backend.DTOs.ServiceDtos;

namespace backend.Services.CustomerServices
{
    public interface ICustomerService
    {
        Task<PaginatedList<CustomerDto>> GetListCustomer();
        Task<CustomerDto> GetCustomerById(string customerId);
        Task<CustomerDto> GetCustomerByRoomId(string roomId);
        Task<CustomerDto> CreateCustomer(CreateUpdateCustomerDto customer);
        Task<CustomerDto> UpdateCustomer(CreateUpdateCustomerDto customer, string id);
        Task<CustomerDto> UpdateServiceCustomer(UpdateServicesCustomerDto updateServicesCustomerDto, string id);
        Task DeleteCustomer(string id);
    }
}
