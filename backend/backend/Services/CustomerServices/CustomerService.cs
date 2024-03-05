using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Contanst;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.Services;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.RoomRepositories;
using backend.Services.FileServices;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver.Linq;

namespace backend.Services.CustomerServices
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        private readonly ICurrentUser _currentUser;
        private readonly IFileService _fileService;
        private readonly IRoomProcessRepository _roomProcessRepository;
        private readonly IPaymentHistoryRepository _paymentHistoryRepository;

        public CustomerService(ICustomerRepository customerRepository, IMapper mapper, ICurrentUser currentUser,
            IFileService fileService, IRoomProcessRepository roomProcessRepository,
            IPaymentHistoryRepository paymentHistoryRepository)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
            _currentUser = currentUser;
            _fileService = fileService;
            _roomProcessRepository = roomProcessRepository;
            _paymentHistoryRepository = paymentHistoryRepository;
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
            if (customer.FileEntryCollection.Any())
            {
                var fileCollectionId = await _fileService.CreateFileCollection(customer.FileEntryCollection,
                    BucketConstant.UploadFiles);

                customerEntity.FileEntryCollectionId = fileCollectionId;
            }

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


        public async Task<PaginatedList<CustomerListViewDto>> GetListCustomer(PaginatedListQuery paginatedListQuery)
        {
            var queryable = _customerRepository.GetQueryable();
            var currentUserId = _currentUser.Id;
            var count = await queryable.CountAsync();
            var listCustomer = await queryable
                .Where(x => x.CreatedBy.Contains(currentUserId.ToString()))
                .Include(x => x.Contracts)
                .QueryablePaging(paginatedListQuery)
                .ToListAsync();
            var results = _mapper.Map<List<Customer>, List<CustomerListViewDto>>(listCustomer);
            var listContracts = listCustomer.SelectMany(x => x.Contracts).ToList();
            foreach (var item in results)
            {
                var contracts = listContracts.Where(x => x.CustomerId.Equals(item.Id))
                    .OrderByDescending(x => x.CreatedTime).ToList();
                if (contracts.Any())
                {
                    var currentContract = contracts.First();
                    if (currentContract.IsEarly || (currentContract.EffectDate!.Value.Date < DateTime.Now.Date &&
                                                    currentContract.ExpiredDate!.Value.Date < DateTime.Now.Date))
                    {
                        item.Status = "Rented";
                        item.StatusName = "Đã thuê";
                    }
                    else if (currentContract.EffectDate!.Value.Date <= DateTime.Now.Date &&
                             currentContract.ExpiredDate!.Value.Date >= DateTime.Now.Date)
                    {
                        item.Status = "Renting";
                        item.StatusName = "Đang thuê";
                    }
                    else if (item.Deposit.HasValue)
                    {
                        item.Status = "Deposited";
                        item.StatusName = "Đã đặt cọc";
                    }
                }
                else if (item.Deposit.HasValue)
                {
                    item.Status = "NoHD";
                    item.StatusName = "Chưa có hợp đồng";
                }
                else
                {
                    item.Status = "NotRented";
                    item.StatusName = "Chưa thuê";
                }
            }

            return new PaginatedList<CustomerListViewDto>(results, count, paginatedListQuery.Offset,
                paginatedListQuery.Limit);
        }

        public async Task<PaginatedList<CustomerDto>> GetHistoriesCustomer(PaginatedListQuery paginatedListQuery)
        {
            var queryable = _customerRepository.GetQueryable();
            var currentUserId = _currentUser.Id;

            var listCustomer = await queryable
                .Where(x => x.CreatedBy.Contains(currentUserId.ToString()))
                .Include(x => x.Contracts)
                .QueryablePaging(paginatedListQuery)
                .ToListAsync();
            var results = _mapper.Map<List<Customer>, List<CustomerDto>>(listCustomer);
            var listCustomerIds = listCustomer.Where(x => x.Contracts.Any(y =>
                    y.CustomerId.Equals(x.Id) && y.EffectDate!.Value.Date <= DateTime.Now.Date &&
                    y.ExpiredDate!.Value.Date >= DateTime.Now.Date))
                .Select(x => x.Id).ToList();
            results = results.Where(x => !listCustomerIds.Contains(x.Id)).ToList();

            return new PaginatedList<CustomerDto>(results, 0, paginatedListQuery.Offset,
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
                                   .Include(x => x.Members)
                                   .Include(x => x.Services)
                                   .FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                               throw new Exception("Không tìm thấy Customer");
            var isAbleToCreateProcess = findCustomer.Deposit is null && customer.Deposit.HasValue;

            var customerEntity = _mapper.Map<CreateUpdateCustomerDto, Customer>(customer, findCustomer);
            customerEntity.LastModifiedBy = _currentUser.Id.ToString();
            customerEntity.LastModifiedTime = DateTime.Now;

            var listDeletedFileIds = customer.ListDeletedFileIds?.Split(',').Select(x => Guid.Parse(x))?.ToList() ??
                                     new List<Guid>();
            customerEntity.FileEntryCollectionId = await _fileService.AddAndRemoveFileEntries(
                findCustomer.FileEntryCollectionId,
                customer.FileEntryCollection, listDeletedFileIds, BucketConstant.UploadFiles);

            var result = await _customerRepository.UpdateAsync(customerEntity, true);
            if (isAbleToCreateProcess)
            {
                await _roomProcessRepository.AddAsync(new RoomProcess()
                {
                    RoomId = customerEntity.RoomId,
                    CustomerId = customerEntity.Id,
                    Action = "Deposited",
                }, true);
            }

            return _mapper.Map<Customer, CustomerDto>(result);
        }

        public async Task<PaginatedList<RoomProcessDto>> GetHistoriesByCustomerId(Guid customerId)
        {
            var listHistories = await _roomProcessRepository.GetQueryable()
                .Where(x => x.CustomerId.Equals(customerId))
                .OrderByDescending(x => x.CreatedTime)
                .ProjectTo<RoomProcessDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            foreach (var item in listHistories)
            {
                if (item.Action == "Return")
                {
                    item.ActionName = "Trả phòng";
                }
                else if (item.Action == "Rent")
                {
                    item.ActionName = "Thuê phòng";
                }
                else if (item.Action == "Deposited")
                {
                    item.ActionName = "Đặt cọc";
                }
            }

            return new PaginatedList<RoomProcessDto>(listHistories, listHistories.Count, 0, -1);
        }

        public async Task<PaginatedList<PaymentHistoryDto>> GetPaymentHistoriesByCustomerId(Guid customerId)
        {
            var listHistories = await _paymentHistoryRepository.GetQueryable()
                .Where(x => x.CustomerId.Equals(customerId))
                .OrderByDescending(x => x.CreatedTime)
                .ProjectTo<PaymentHistoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return new PaginatedList<PaymentHistoryDto>(listHistories, listHistories.Count, 0, -1);
        }

        public Task<bool> CheckEmailCustomer(string email)
        {
            var queryable = _customerRepository.GetQueryable();
            return queryable.AnyAsync(x => x.Email.Equals(email));
        }
    }
}