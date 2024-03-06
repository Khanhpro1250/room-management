using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;

namespace backend.Services.CustomerServices
{
    public interface ICustomerService
    {
        Task<PaginatedList<CustomerListViewDto>> GetListCustomer(PaginatedListQuery paginatedListQuery);
        Task<PaginatedList<CustomerDto>> GetHistoriesCustomer(PaginatedListQuery paginatedListQuery);
        Task<CustomerDto> GetCustomerById(Guid customerId);
        Task<CustomerDto> GetCustomerByRoomId(Guid roomId);
        Task<List<CustomerDto>> GetCustomerByRoomIds(List<Guid> roomIds);
        Task<CustomerDto> CreateCustomer(CreateUpdateCustomerDto customer);
        Task<CustomerDto> UpdateCustomer(CreateUpdateCustomerDto customer, Guid id);

        Task<CustomerDto> UpdateMemberServiceCustomer(UpdateMemberServicesCustomerDto updateMemberServicesCustomerDto,
            Guid id);

        Task DeleteCustomer(Guid id);

        Task<List<Guid>> GetRoomIdByCustomerName(string name);

        Task<PaginatedList<RoomProcessDto>> GetHistoriesByCustomerId(Guid customerId);
        Task<PaginatedList<PaymentHistoryDto>> GetPaymentHistoriesByCustomerId(Guid customerId);

        Task<bool> CheckEmailCustomer(string email, Guid? id = null);
        Task<CustomerMobileDto> ValidationOtpCustomer(string opt, string email);
    }
}