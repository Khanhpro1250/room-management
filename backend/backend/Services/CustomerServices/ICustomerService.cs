using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;

namespace backend.Services.CustomerServices
{
    public interface ICustomerService
    {
        Task<PaginatedList<CustomerDto>> GetListCustomer();
        Task<CustomerDto> GetCustomerById(string customerId);
        Task<CustomerDto> CreateCustomer(CreateUpdateCustomerDto customer);
        Task<CustomerDto> UpdateCustomer(CreateUpdateCustomerDto customer, string id);
        Task DeleteCustomer(string id);
    }
}
