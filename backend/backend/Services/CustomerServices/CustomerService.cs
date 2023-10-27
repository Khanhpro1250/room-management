using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.Services;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.RoomRepositories;
using backend.Services.UserServices;
using MongoDB.Driver;

namespace backend.Services.CustomerServices
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        private ICurrentUser _currentUser;

        public CustomerService(ICustomerRepository customerRepository, IMapper mapper, ICurrentUser currentUser)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<CustomerDto> GetCustomerByRoomId(string roomId)
        {
            var queryable = _customerRepository.GetQueryable();
            var customer = await queryable.Find(x => x.RoomId.Contains(roomId)).FirstOrDefaultAsync();
            var result = _mapper.Map<Customer, CustomerDto>(customer);
            return result;
        }

        public async Task<CustomerDto> CreateCustomer(CreateUpdateCustomerDto customer)
        {
            var customerEntity = _mapper.Map<CreateUpdateCustomerDto, Customer>(customer);
            customerEntity.CreatedBy = _currentUser.Id;
            customerEntity.CreatedTime = DateTime.Now;
            var result = await _customerRepository.CreateCustomer(customerEntity);
            return _mapper.Map<Customer, CustomerDto>(result);
        }

        public async Task<CustomerDto> UpdateServiceCustomer(UpdateServicesCustomerDto updateServicesCustomerDto, string id)
        {
            var customer = await _customerRepository.GetCustomerById(id);
            customer.Services = _mapper.Map<List<ServiceCustomerDto>, List<ServiceCustomer>>(updateServicesCustomerDto.Services);
            var result = await _customerRepository.UpdateCustomer(customer, id);
            return _mapper.Map<Customer, CustomerDto>(result);
        }

        public async Task DeleteCustomer(string id)
        {
            await _customerRepository.DeleteCustomer(id);
        }

        public async Task<PaginatedList<CustomerDto>> GetListCustomer()
        {
            var listCustomer = await _customerRepository.GetListCustomer();
            var result = _mapper.Map<List<Customer>, List<CustomerDto>>(listCustomer);
            return new PaginatedList<CustomerDto>(result, result.Count, 0, 10);
        }

        public async Task<CustomerDto> GetCustomerById(string customerId)
        {
            var customer = await _customerRepository.GetCustomerById(customerId);
            var result = _mapper.Map<Customer, CustomerDto>(customer);
            return result;
        }

        public async Task<CustomerDto> UpdateCustomer(CreateUpdateCustomerDto customer, string id)
        {
            var customerEntity = _mapper.Map<CreateUpdateCustomerDto, Customer>(customer);
            customerEntity.LastModifiedBy = _currentUser.Id;
            customerEntity.LastModifiedTime = DateTime.Now;

            var result = await _customerRepository.UpdateCustomer(customerEntity, id);
            return _mapper.Map<Customer, CustomerDto>(result);
        }
    }
}