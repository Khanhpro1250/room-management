using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;

namespace backend.Services.CustomerServices
{
    public interface ICustomerService
    {
        Task<PaginatedList<CustomerDto>> GetListCustomer(PaginatedListQuery paginatedListQuery);
        Task<CustomerDto> GetCustomerById(Guid customerId);
        Task<CustomerDto> GetCustomerByRoomId(Guid roomId);
        Task<List<CustomerDto>> GetCustomerByRoomIds(List<Guid> roomIds);
        Task<CustomerDto> CreateCustomer(CreateUpdateCustomerDto customer);
        Task<CustomerDto> UpdateCustomer(CreateUpdateCustomerDto customer, Guid id);
        
        Task<CustomerDto> UpdateMemberServiceCustomer(UpdateMemberServicesCustomerDto updateMemberServicesCustomerDto,
            Guid id);
        
        Task DeleteCustomer(Guid id);
        
        Task<List<Guid>> GetRoomIdByCustomerName(string name);
    }
}