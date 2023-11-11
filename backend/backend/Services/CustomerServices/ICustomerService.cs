using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;

namespace backend.Services.CustomerServices
{
    public interface ICustomerService
    {
        Task<PaginatedList<CustomerDto>> GetListCustomer();
        Task<CustomerDto> GetCustomerById(string customerId);
        Task<CustomerDto> GetCustomerByRoomId(string roomId);
        Task<List<CustomerDto>> GetCustomerByRoomIds(List<string> roomIds);
        Task<CustomerDto> CreateCustomer(CreateUpdateCustomerDto customer);
        Task<CustomerDto> UpdateCustomer(CreateUpdateCustomerDto customer, string id);

        Task<CustomerDto> UpdateMemberServiceCustomer(UpdateMemberServicesCustomerDto updateMemberServicesCustomerDto,
            string id);

        Task DeleteCustomer(string id);

        Task<List<string>> GetRoomIdByCustomerName(string name);
    }
}