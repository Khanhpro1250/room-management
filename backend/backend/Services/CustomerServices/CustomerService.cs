using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Services;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.CustomerServices
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUser _currentUser;

        public CustomerService(ICustomerRepository customerRepository, IMapper mapper, ICurrentUser currentUser)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<CustomerDto> GetCustomerByRoomId(Guid roomId)
        {
            var queryable = _customerRepository.GetQueryable();
            var customer = await queryable.FirstOrDefaultAsync(x => x.RoomId.Equals(roomId));
            var result = _mapper.Map<Customer, CustomerDto>(customer);
            return result;
        }

        public async Task<List<CustomerDto>> GetCustomerByRoomIds(List<Guid> roomIds)
        {
            var queryable = _customerRepository.GetQueryable();
            var customers = await queryable
                .Where(x => roomIds.Contains(x.RoomId))
                .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return customers;
        }

        public async Task<CustomerDto> CreateCustomer(CreateUpdateCustomerDto customer)
        {
            var customerEntity = _mapper.Map<CreateUpdateCustomerDto, Customer>(customer);
            customerEntity.CreatedBy = _currentUser.Id.ToString();
            customerEntity.CreatedTime = DateTime.Now;
            var result = await _customerRepository.AddAsync(customerEntity, true);
            return _mapper.Map<Customer, CustomerDto>(result);
        }

        public async Task<CustomerDto> UpdateMemberServiceCustomer(
            UpdateMemberServicesCustomerDto updateMemberServicesCustomerDto, Guid id)
        {
            var customer = await _customerRepository.GetQueryable()
                .Include(x => x.Members)
                .Include(x => x.Services)
                .FirstOrDefaultAsync(x => x.Id.Equals(id));

            if (customer is null) return new CustomerDto();


            customer.Services =
                _mapper.Map<List<ServiceCustomerDto>, List<ServiceCustomer>>(updateMemberServicesCustomerDto
                    .Services);

            customer.Members = _mapper.Map<List<MemberDto>, List<Member>>(updateMemberServicesCustomerDto.Members);


            var result = await _customerRepository.UpdateAsync(customer, true);
            return _mapper.Map<Customer, CustomerDto>(result);
        }

        public async Task DeleteCustomer(Guid id)
        {
            var customer = await _customerRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(id));
            await _customerRepository.DeleteAsync(customer, true);
        }

        public async Task<List<Guid>> GetRoomIdByCustomerName(string name)
        {
            var queryable = _customerRepository.GetQueryable();
            var customers = await queryable.Where(x => x.FullName.ToLower().Contains(name.ToLower())).ToListAsync();
            return customers.Select(x => x.RoomId).ToList();
        }


        public async Task<PaginatedList<CustomerDto>> GetListCustomer(PaginatedListQuery paginatedListQuery)
        {
            var queryable = _customerRepository.GetQueryable();
            var count = await queryable.CountAsync();
            var listCustomer = await queryable
                .ProjectTo<CustomerDto>(_mapper.ConfigurationProvider)
                .QueryablePaging(paginatedListQuery)
                .ToListAsync();

            return new PaginatedList<CustomerDto>(listCustomer, count, paginatedListQuery.Offset,
                paginatedListQuery.Limit);
        }

        public async Task<CustomerDto> GetCustomerById(Guid customerId)
        {
            var customer = await _customerRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(customerId));
            var result = _mapper.Map<Customer, CustomerDto>(customer);
            return result;
        }

        public async Task<CustomerDto> UpdateCustomer(CreateUpdateCustomerDto customer, Guid id)
        {
            var findCustomer = await _customerRepository.GetQueryable()
                                   .AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                               throw new Exception("Không tìm thấy Customer");
            var customerEntity = _mapper.Map<CreateUpdateCustomerDto, Customer>(customer);
            customerEntity.LastModifiedBy = _currentUser.Id.ToString();
            customerEntity.LastModifiedTime = DateTime.Now;

            var result = await _customerRepository.UpdateAsync(customerEntity, true);
            return _mapper.Map<Customer, CustomerDto>(result);
        }
    }
}