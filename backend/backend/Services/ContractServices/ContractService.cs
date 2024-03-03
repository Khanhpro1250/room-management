using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;
using backend.Models.Entities.Contracts;
using backend.Models.Entities.Rooms;
using backend.Models.Repositorties.ContractRepositories;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.DepositRepositories;
using backend.Models.Repositorties.RoomRepositories;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.ContractServices
{
    public class ContractService : IContractService
    {
        private readonly IContractRepository _contractRepository;
        private readonly IMapper _mapper;
        private readonly IRoomRepository _roomRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IUserService _userService;
        private readonly IRoomProcessRepository _roomProcessRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IDepositRepository _depositRepository;

        public ContractService(IContractRepository contractRepository, IMapper mapper, IRoomRepository roomRepository,
            ICurrentUser currentUser, IUserService userService, IRoomProcessRepository roomProcessRepository,
            ICustomerRepository customerRepository, IDepositRepository depositRepository)
        {
            _contractRepository = contractRepository;
            _mapper = mapper;
            _roomRepository = roomRepository;
            _currentUser = currentUser;
            _userService = userService;
            _roomProcessRepository = roomProcessRepository;
            _customerRepository = customerRepository;
            _depositRepository = depositRepository;
        }

        public async Task<ContractDto> CreateContract(CreateUpdateContractDto contract)
        {
            var contractEntity = _mapper.Map<CreateUpdateContractDto, Contract>(contract);
            contractEntity.CreatedTime = DateTime.Now;
            contractEntity.CreatedBy = _currentUser.Id.ToString();
            var roomProcess = new RoomProcess()
            {
                RoomId = contract.RoomId,
                CustomerId = contract.CustomerId,
                Action = "RENT",
                CreatedTime = DateTime.Now
            };
            var result = await _contractRepository.AddAsync(contractEntity, true);
            await _roomProcessRepository.AddAsync(roomProcess, true);
            await UpdateDepositState(contract.CustomerId, contract.RoomId);
            

            return _mapper.Map<Contract, ContractDto>(result);
        }

        private async Task UpdateDepositState(Guid customerId, Guid roomId)
        {
            var customer = await _customerRepository.GetQueryable()
                .FirstOrDefaultAsync(x => x.Id.Equals(customerId));
            var deposit = await _depositRepository.GetQueryable()
                .FirstOrDefaultAsync(x => x.RoomId.Equals(roomId));
            if (deposit is not null)
            {
                if (customer.RentalStartTime.HasValue && deposit.ExpectedDate.HasValue &&
                    customer.RentalStartTime.Value.Date <= deposit.ExpectedDate.Value.Date &&
                    (deposit.PhoneNumber.Contains(customer.PhoneNumber1) ||
                     deposit.PhoneNumber.Contains(customer?.PhoneNumber2 ?? "")))
                {
                    deposit.Status = "CheckedIn";
                    var roomProcess = new RoomProcess()
                    {
                        RoomId = deposit.RoomId,
                        CustomerId = customerId,
                        Action = "Deposited",
                        CreatedTime = deposit.CreatedTime
                    };
                    await _depositRepository.UpdateAsync(deposit, true);
                    await _roomProcessRepository.AddAsync(roomProcess, true);
                }
            }
        }

        public async Task DeleteContract(Guid id)
        {
            var findContract = await _contractRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                               throw new Exception("Không tìm thấy hợp đồng");
            await _contractRepository.DeleteAsync(findContract, true);
            var roomProcess = new RoomProcess()
            {
                RoomId = findContract.RoomId,
                CustomerId = findContract.CustomerId,
                Action = "Cancel",
                CreatedTime = DateTime.Now
            };
            await _roomProcessRepository.AddAsync(roomProcess, true);
        }


        public async Task<PaginatedList<ContractDto>> GetListContract(PaginatedListQuery paginatedListQuery)
        {
            var queryable = _contractRepository.GetQueryable();
            var count = await queryable.CountAsync();
            var listContract = await queryable
                .ProjectTo<ContractDto>(_mapper.ConfigurationProvider)
                .QueryablePaging(paginatedListQuery)
                .ToListAsync();

            foreach (var item in listContract)
            {
                item.IsCurrent = DatetimeExtension.IsDateInRange(DateTime.Now, item.EffectDate, item.ExpiredDate);
            }

            return new PaginatedList<ContractDto>(listContract, count, paginatedListQuery.Offset,
                paginatedListQuery.Limit);
        }

        public async Task<ContractDto> GetContractById(Guid id)
        {
            var findContract = await _contractRepository.GetQueryable()
                                   .AsNoTracking()
                                   .FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                               throw new Exception("Không tìm thấy hợp đồng");
            var result = _mapper.Map<Contract, ContractDto>(findContract);
            return result;
        }

        public async Task<ContractDto> UpdateContract(CreateUpdateContractDto contract, Guid id)
        {
            var findContract = await _contractRepository.GetQueryable()
                                   .FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                               throw new Exception("Không tìm thấy hợp đồng");

            var contractEntity = _mapper.Map<CreateUpdateContractDto, Contract>(contract, findContract);
            contractEntity.LastModifiedTime = DateTime.Now;
            contractEntity.LastModifiedBy = _currentUser.Id.ToString();
            var result = await _contractRepository.UpdateAsync(contractEntity, true);
            return _mapper.Map<Contract, ContractDto>(result);
        }

        public async Task<ContractDto> GetCurrentContractRoomId(Guid roomId, Guid? customerId = null)
        {
            var queryable = _contractRepository.GetQueryable();

            var listContract = await queryable
                .WhereIf(customerId is not null, x => x.CustomerId.Equals(customerId))
                .Where(x => x.RoomId.Equals(roomId))
                .ToListAsync();
            var currentContract = listContract.FirstOrDefault(x =>
                DatetimeExtension.IsDateInRange(DateTime.Now, x.EffectDate, x.ExpiredDate));
            return _mapper.Map<Contract, ContractDto>(currentContract);
        }

        public async Task<bool> ValidateContract(CreateUpdateContractDto contractDto, Guid? id = null)
        {
            var queryable = _contractRepository.GetQueryable();

            var findContractNo = await queryable
                .AsNoTracking()
                .WhereIf(id.HasValue, x => x.Id != id)
                .Where(x => x.ContractNumber.Contains(contractDto.ContractNumber))
                .FirstOrDefaultAsync();

            if (findContractNo is not null) throw new Exception("Số hợp đồng đã tồn tại!");

            var listContract = await queryable
                .AsNoTracking()
                .Where(x =>
                    x.CustomerId.Equals(contractDto.CustomerId) && x.RoomId.Equals(contractDto.RoomId)).ToListAsync();
            var lastContract = listContract.MaxBy(x => x.ExpiredDate);

            if (lastContract is not null && contractDto.EffectDate >= lastContract.ExpiredDate)
                throw new Exception(
                    "Ngày hiệu lực hợp đồng không được nằm trong khoản thời gian hiệu lực hợp đồng cũ!");

            return true;
        }

        public async Task<ExportContractDto> GetDataExportContract(CreateUpdateContractDto contractDto)
        {
            //Todo: check điều kiện xuất dữ liệu customer
            var roomQueryable = _roomRepository.GetQueryable();
            var user = await _userService.GetUserById(_currentUser.Id);
            var room = await roomQueryable.AsNoTracking()
                           .Include(x => x.Customers)
                           .ThenInclude(x => x.Contracts)
                           .FirstOrDefaultAsync(x => x.Id.Equals(contractDto.RoomId)) ??
                       throw new Exception("Không tìm thấy phòng");
            var customer = room?.Customers.FirstOrDefault(x => x.Id.Equals(contractDto.CustomerId));
            var result = new ExportContractDto()
            {
                CurrentDay = contractDto.SignedDate.Day.ToString(),
                CurrentMonth = contractDto.SignedDate.Month.ToString(),
                CurrentYear = contractDto.SignedDate.Year.ToString(),
                EffectDate = contractDto.EffectDate.ToString("dd/MM/yyyy"),
                Month = contractDto.Month,
                ContractNumber = contractDto.ContractNumber,
                SignedDate = contractDto.SignedDate.ToString("dd/MM/yyyy"),
                Customer = new CustomerExportDto
                {
                    FullName = customer?.FullName,
                    DateOfBirth = customer?.Birthday?.ToString("dd/MM/yyyy"),
                    IdentityNo = customer?.IdentityNo,
                    IssueDate = customer?.IssueDate?.ToString("dd/MM/yyyy"),
                    IssuePlace = customer?.IssuePlace,
                    PermanentAddress = customer?.PermanentAddress,
                    PhoneNumber = customer?.PhoneNumber1,
                    Deposit = MoneyConverter.ToLocaleDotString(customer?.Deposit ?? 0),
                    DepositWord = MoneyConverter.ConvertToMoneyString(customer?.Deposit ?? 0)
                },
                Room = new RoomExportDto
                {
                    Price = MoneyConverter.ToLocaleDotString(room.Price),
                    PriceWord = MoneyConverter.ConvertToMoneyString(room.Price)
                },
                User = new UserExportDto
                {
                    FullName = user.FullName,
                    PhoneNumber = user.PhoneNumber,
                    Address = user.Address
                }
            };
            return result;
        }
    }
}