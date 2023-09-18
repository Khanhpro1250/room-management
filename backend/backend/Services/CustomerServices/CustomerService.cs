using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.RoomRepositories;

namespace backend.Services.CustomerServices
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public CustomerService(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }
        public async Task<CustomerDto> CreateCustomer(CreateUpdateCustomerDto customer)
        {
            var customerEntity = _mapper.Map<CreateUpdateCustomerDto, Customer>(customer);
            var result = await _customerRepository.CreateCustomer(customerEntity);
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
            return new PaginatedList<CustomerDto>(result, result.Count, 0 , 10);
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
            var result = await _customerRepository.UpdateCustomer(customerEntity, id);
            return _mapper.Map<Customer, CustomerDto>(result);
        }
    }
}
