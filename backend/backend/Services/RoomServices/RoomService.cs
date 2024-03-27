using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Contanst;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.Services;
using backend.Models.Repositorties.ContractRepositories;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.DepositRepositories;
using backend.Models.Repositorties.RoomRepositories;
using backend.Models.Repositorties.ServiceRepositories;
using backend.Services.CloudinaryServices;
using backend.Services.CustomerServices;
using backend.Services.FileServices;
using backend.Services.ServiceServices;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver.Linq;

namespace backend.Services.RoomServices;

public class RoomService : IRoomService
{
    private readonly IRoomRepository _roomRepository;
    private readonly IMapper _mapper;
    private readonly ICloudinaryService _cloudinaryService;
    private readonly ICustomerService _customerService;
    private readonly IServiceService _serviceService;
    private readonly ICurrentUser _currentUser;
    private readonly IContractRepository _contractRepository;
    private readonly IFileService _fileService;
    private readonly IServiceRepository _serviceRepository;
    private readonly IRoomServiceIndexRepository _roomServiceIndexRepository;
    private readonly IRoomProcessRepository _roomProcessRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IIncurredCostRepository _incurredCostRepository;
    private readonly IDepositRepository _depositRepository;


    public RoomService(IRoomRepository roomRepository, IMapper mapper, ICloudinaryService cloudinaryService,
        ICustomerService customerService, IServiceService serviceService, ICurrentUser currentUser,
        IContractRepository contractRepository, IFileService fileService, IServiceRepository serviceRepository,
        IRoomServiceIndexRepository roomServiceIndexRepository, IRoomProcessRepository roomProcessRepository,
        ICustomerRepository customerRepository, IIncurredCostRepository incurredCostRepository,
        IDepositRepository depositRepository)
    {
        _roomRepository = roomRepository;
        _mapper = mapper;
        _cloudinaryService = cloudinaryService;
        _customerService = customerService;
        _serviceService = serviceService;
        _currentUser = currentUser;
        _contractRepository = contractRepository;
        _fileService = fileService;
        _serviceRepository = serviceRepository;
        _roomServiceIndexRepository = roomServiceIndexRepository;
        _roomProcessRepository = roomProcessRepository;
        _customerRepository = customerRepository;
        _incurredCostRepository = incurredCostRepository;
        _depositRepository = depositRepository;
    }

    public async Task<RoomDto> CreateRoom(CreateUpdateRoomDto room)
    {
        var roomEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
        roomEntity.CreatedBy = _currentUser.Id.ToString();
        roomEntity.CreatedTime = DateTime.Now;
        roomEntity.Status = nameof(RoomStatus.New);

        if (room.FileEntryCollection.Any())
        {
            var fileCollectionId = await _fileService.CreateFileCollection(room.FileEntryCollection,
                BucketConstant.UploadFiles);

            roomEntity.FileEntryCollectionId = fileCollectionId;
        }

        var result = await _roomRepository.AddAsync(roomEntity, true);
        return _mapper.Map<Room, RoomDto>(result);
    }

    public async Task DeleteRoom(Guid id)
    {
        var room = await _roomRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(id));
        await _roomRepository.DeleteAsync(room, true);
    }

    public async Task<List<RoomComboOptionDto>> GetComboRoom(FilterComboRoomDto filter)
    {
        var currentId = _currentUser.Id;
        var queryable = _roomRepository.GetQueryable();
        var listRooms = await queryable
            .WhereIf(filter.HouseId.HasValue, x => x.HouseId.Equals(filter.HouseId))
            .Where(x => x.House.UserId.Equals(currentId))
            .Include(x => x.Customers)
            .ThenInclude(x => x.Contracts)
            .ToListAsync();

        if (filter.IsComboDeposit)
        {
            var depositRoomIds = await _depositRepository.GetQueryable()
                .Where(x => x.Status == "DEPOSIT")
                .Where(x => x.ExpectedDate.HasValue && x.ExpectedDate.Value.Date >= DateTime.Now.Date)
                .Where(x => x.DepositDate.Date <= DateTime.Now.Date)
                .WhereIf(filter.RoomId.HasValue, x => !x.RoomId.Equals(filter.RoomId))
                .Select(x => x.RoomId).ToListAsync();
            listRooms = listRooms
                .Where(x => !depositRoomIds.Contains(x.Id))
                .Where(x => x.Customers == null ||
                            !(x.Customers != null && x.Customers.Any()) ||
                            x.Customers != null && x.Customers.MaxBy(y => y.CreatedTime)?.Deposit is null ||
                            x.Customers != null && x.Customers.SelectMany(y => y.Contracts)?.MaxBy(y => y.CreatedTime)?
                                .ExpiredDate < DateTime.Now
                )
                .ToList();
        }


        var result = listRooms.Select(x => new RoomComboOptionDto()
            {
                Label = x.RoomCode,
                Value = x.Id,
                HouseId = x.HouseId
            })
            .OrderBy(x => x.Label)
            .ToList();

        return result;
    }

    public async Task<PaginatedList<RoomDto>> GetListRoom(RoomFiterDto filterDto)
    {
        var queryable = _roomRepository.GetQueryable();
        var currentUserId = _currentUser.Id;

        var depositRepository = _depositRepository.GetQueryable();
        var listRoomDepositIds = await depositRepository.Where(x => x.DepositDate.Date <= DateTime.Now.Date)
            .Where(x => x.ExpectedDate.HasValue && x.ExpectedDate.Value.Date >= DateTime.Now.Date)
            .Select(x => x.RoomId).ToListAsync();

        var listRoom = await queryable
            .WhereIf(!String.IsNullOrEmpty(filterDto.RoomCode), x => x.RoomCode.Contains(filterDto.RoomCode))
            .WhereIf(filterDto.HouseId.HasValue, x => x.HouseId.Equals(filterDto.HouseId))
            .WhereIf(!_currentUser.IsAdmin, x => x.CreatedBy.Contains(currentUserId.ToString()))
            .Include(x => x.Customers)
            .ThenInclude(x => x.Contracts)
            .Include(x => x.FileEntryCollection.FileEntries)
            .ToListAsync();

        if (!String.IsNullOrEmpty(filterDto.Status) && filterDto.Status == nameof(RoomStatus.New))
        {
            listRoom = listRoom.Where(x => x.Customers == null ||
                                           !x.Customers.Any() ||
                                           x.Customers.MaxBy(y => y.CreatedTime)?.Deposit is null ||
                                           x.Customers.SelectMany(y => y.Contracts).MaxBy(y => y.CreatedTime)
                                               .ExpiredDate < DateTime.Now)
                .ToList();
        }


        if (!String.IsNullOrEmpty(filterDto.Status) && filterDto.Status == nameof(RoomStatus.Rented))
        {
            listRoom = listRoom.Where(x => x.Customers != null &&
                                           x.Customers.Any() &&
                                           x.Customers.Any(y =>
                                               y.Contracts != null &&
                                               y.Contracts.Any() &&
                                               y.Contracts.MaxBy(z => z.CreatedTime).ExpiredDate >= DateTime.Now &&
                                               y.Contracts.MaxBy(z => z.CreatedTime).EffectDate <= DateTime.Now))
                .ToList();
        }

        if (!String.IsNullOrEmpty(filterDto.CustomerName))
        {
            listRoom = listRoom.Where(x => x.Customers != null &&
                                           x.Customers.Any() &&
                                           x.Customers.Any(y =>
                                               y.Contracts != null &&
                                               y.Contracts.Any() &&
                                               y.Contracts.MaxBy(z => z.CreatedTime).ExpiredDate >= DateTime.Now &&
                                               y.Contracts.MaxBy(z => z.CreatedTime).EffectDate <= DateTime.Now)
                                           && x.Customers.Any(y => y.FullName.Contains(filterDto.CustomerName)
                                           )).ToList();
        }

        if (!String.IsNullOrEmpty(filterDto.ContractNumber))
        {
            listRoom = listRoom.Where(x => x.Customers != null &&
                                           x.Customers.Any() &&
                                           x.Customers.Any(y =>
                                               y.Contracts != null &&
                                               y.Contracts.Any() &&
                                               y.Contracts.MaxBy(z => z.CreatedTime).ExpiredDate >= DateTime.Now &&
                                               y.Contracts.MaxBy(z => z.CreatedTime).EffectDate <= DateTime.Now &&
                                               y.Contracts.Any(z => z.ContractNumber.Contains(filterDto.ContractNumber))
                                           )).ToList();
        }


        var count = await queryable.CountAsync();
        var contracts = listRoom.SelectMany(x => x.Customers).SelectMany(x => x.Contracts).ToList();
        var result = new List<RoomDto>();
        foreach (var item in listRoom)
        {
            var roomDto = _mapper.Map<Room, RoomDto>(item);
            var contract = contracts
                .Where(x => x.EffectDate <= DateTime.Now)
                .Where(x => x.ExpiredDate >= DateTime.Now)
                .Where(x => !x.IsEarly)
                .FirstOrDefault(x => x.RoomId.Equals(item.Id));
            if (contract is not null)
            {
                roomDto.Status = nameof(RoomStatus.Rented);
                roomDto.StatusName = "Đã cho thuê";
            }
            else if (item.Customers is not null && item.Customers.Any())
            {
                roomDto.Status = nameof(RoomStatus.New);
                roomDto.StatusName = "Còn trống";
            }
            else if (listRoomDepositIds.Contains(item.Id))
            {
                roomDto.Status = nameof(RoomStatus.Deposited);
                roomDto.StatusName = "Đã đặt cọc";
            }
            else
            {
                roomDto.Status = nameof(RoomStatus.New);
                roomDto.StatusName = "Còn trống";
            }

            result.Add(roomDto);
        }

        return new PaginatedList<RoomDto>(result.OrderBy(x => x.RoomCode).ToList(), count,
            filterDto.PaginatedListQuery.Offset,
            filterDto.PaginatedListQuery.Limit);
    }

    public async Task<RoomDto> GetRoomById(Guid roomId)
    {
        var result = await _roomRepository
            .GetQueryable()
            .ProjectTo<RoomDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id.Equals(roomId));
        return result;
    }

    public async Task<RoomDto> UpdateRoom(CreateUpdateRoomDto room, Guid id)
    {
        var oldRoom = await _roomRepository.GetQueryable()
                          .AsNoTracking()
                          .FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
                      throw new Exception("Không tim thấy phòng");
        var newEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
        newEntity.LastModifiedBy = _currentUser.Id.ToString();
        newEntity.LastModifiedTime = DateTime.Now;

        var listDeletedFileIds = room.ListDeletedFileIds?.Split(',').Select(x => Guid.Parse(x))?.ToList() ??
                                 new List<Guid>();
        newEntity.FileEntryCollectionId = await _fileService.AddAndRemoveFileEntries(
            oldRoom.FileEntryCollectionId,
            room.FileEntryCollection, listDeletedFileIds, BucketConstant.UploadFiles);
        var result = await _roomRepository.UpdateAsync(newEntity, true);


        return _mapper.Map<Room, RoomDto>(result);
    }


    public async Task<DataWithRoomDto> GetDataWithRoom(Guid roomId)
    {
        var queryable = _roomRepository.GetQueryable();
        var deposit = await _depositRepository.GetQueryable()
            .Where(x => x.ExpectedDate.HasValue && x.ExpectedDate.Value.Date >= DateTime.Now.Date &&
                        x.DepositDate.Date <= DateTime.Now.Date)
            .FirstOrDefaultAsync(x => x.RoomId.Equals(roomId));

        var room = await queryable
            .AsNoTracking()
            .Include(x => x.Customers)
            .ThenInclude(x => x.Members)
            .Include(x => x.Customers)
            .ThenInclude(x => x.Services)
            .Include(x => x.Customers)
            .ThenInclude(x => x.FileEntryCollection.FileEntries)
            .Include(x => x.Customers)
            .ThenInclude(x => x.Contracts)
            .AsNoTrackingWithIdentityResolution()
            .Include(x => x.Customers)
            .FirstOrDefaultAsync(x => x.Id.Equals(roomId));

        var customers = room.Customers.ToList();
        var customer = customers
            .OrderByDescending(x => x.CreatedTime)
            .FirstOrDefault(x =>
                (x.Contracts.MaxBy(y => y.CreatedTime).EffectDate <= DateTime.Now &&
                 x.Contracts.MaxBy(y => y.CreatedTime).ExpiredDate < DateTime.Now &&
                 x.Contracts.MaxBy(y => y.CreatedTime).IsEarly) ||
                (x.Contracts.MaxBy(y => y.CreatedTime).EffectDate <= DateTime.Now &&
                 x.Contracts.MaxBy(y => y.CreatedTime).ExpiredDate >= DateTime.Now &&
                 !x.Contracts.MaxBy(y => y.CreatedTime).IsEarly)||
                (x.Contracts.MaxBy(y => y.CreatedTime).EffectDate > DateTime.Now &&
                 x.Contracts.MaxBy(y => y.CreatedTime).ExpiredDate > DateTime.Now) ||
                (x.Contracts == null || x.Contracts.Count == 0)
            );
        // .FirstOrDefault(x =>
        //     (x.Contracts.Any(y => y.EffectDate < DateTime.Now && y.ExpiredDate >= DateTime.Now && !y.IsEarly)) ||
        //     (x.Contracts.Any(y => y.EffectDate > DateTime.Now && y.ExpiredDate > DateTime.Now)) ||
        //     x.Contracts == null || x.Contracts.Count == 0);

        ContractDto contract = null;
        if (customer is not null)
        {
            contract = await _contractRepository.GetQueryable()
                .AsNoTracking()
                .Where(x => x.CustomerId.Equals(customer.Id))
                .ProjectTo<ContractDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(x => x.CreatedTime)
                .FirstOrDefaultAsync(x => x.ExpiredDate >= DateTime.Now);
        }

        if (customer == null && deposit != null)
        {
            customer = new Customer()
            {
                RoomId = roomId,
                Deposit = (float?)deposit?.DepositAmount,
                FullName = deposit?.CustomerName,
                PhoneNumber1 = deposit?.PhoneNumber,
                RentalStartTime = deposit?.ExpectedDate,
            };
        }

        var listServices = await _serviceService.GetListServiceRegister();
        var result = new DataWithRoomDto()
        {
            Room = _mapper.Map<RoomDto>(room),
            Customer = _mapper.Map<CustomerDto>(customer),
            ListServices = listServices,
            Contract = contract,
            Services = _mapper.Map<List<ServiceCustomer>, List<ServiceCustomerDto>>(customer?.Services),
            Members = _mapper.Map<List<Member>, List<MemberDto>>(customer?.Members)
        };

        return result;
    }


    public async Task<PaginatedList<RoomElectricServiceDto>> GetElectricServiceRoom(ElectricServiceFilterDto filterDto)
    {
        var currentUserId = _currentUser.Id;
        var roomQueryable = _roomRepository.GetQueryable();
        var serviceQueryable = _serviceRepository.GetQueryable();
        var service = await serviceQueryable
                .FirstOrDefaultAsync(x => (filterDto.ServiceType == ServiceType.Electric && x.Type.Equals("DIEN")) ||
                                          (filterDto.ServiceType == ServiceType.Water && x.Type.Equals("NUOC")))
            ;
        var count = await roomQueryable.CountAsync();
        var rooms = await roomQueryable
            .Include(x => x.House)
            .Include(x => x.RoomServiceIndices)
            .Include(x => x.Customers)
            .Where(x => x.House.UserId.Equals(currentUserId))
            .WhereIf(filterDto.HouseId.HasValue, x => x.HouseId.Equals(filterDto.HouseId))
            .WhereIf(!string.IsNullOrEmpty(filterDto.RoomCode), x => x.RoomCode.Contains(filterDto.RoomCode))
            .ToListAsync();


        var roomServiceIndices = rooms.SelectMany(x => x.RoomServiceIndices)
            .Where(x => x.Month.Equals(filterDto.CurrentDate.Month) && x.Year.Equals(filterDto.CurrentDate.Year))
            .Where(x => x.ServiceId.Equals(service.Id))
            .ToList();

        var prevRoomServiceIndices = rooms.SelectMany(x => x.RoomServiceIndices)
            .Where(x =>
                new DateTime(filterDto.CurrentDate.Year, filterDto.CurrentDate.Month, 1).AddMonths(-1).Month
                    .Equals(x.Month) && new DateTime(filterDto.CurrentDate.Year, filterDto.CurrentDate.Month, 1)
                    .AddMonths(-1).Year.Equals(x.Year))
            .Where(x => x.ServiceId.Equals(service.Id))
            .ToList();


        var nextRoomServiceIndices = rooms.SelectMany(x => x.RoomServiceIndices)
            // .Where(x => x.Month.Equals(filterDto.CurrentDate.Month + 1) && x.Year.Equals(filterDto.CurrentDate.Year))
            .Where(x =>
                new DateTime(filterDto.CurrentDate.Year, filterDto.CurrentDate.Month, 1).AddMonths(1).Month
                    .Equals(x.Month) && new DateTime(filterDto.CurrentDate.Year, filterDto.CurrentDate.Month, 1)
                    .AddMonths(1).Year.Equals(x.Year))
            .Where(x => x.ServiceId.Equals(service.Id))
            .ToList();


        var result = new List<RoomElectricServiceDto>();
        if (roomServiceIndices.Any())
        {
            result = roomServiceIndices.Select(x => new RoomElectricServiceDto
            {
                Id = x.Id,
                RoomId = x.RoomId,
                RoomCode = x.Room.RoomCode,
                HouseName = x.Room.House.Name,
                Month = x?.Month ?? DateTime.Now.Month,
                Year = x?.Year ?? DateTime.Now.Year,
                OldElectricValue = x.OldElectricValue,
                NewElectricValue = x.NewElectricValue,
                UsedElectricValue = x.UsedElectricValue,
                ServiceId = x.ServiceId
            }).ToList();
        }

        result.AddRange(rooms
            .Where(x => x.RoomServiceIndices == null || !x.RoomServiceIndices.Any()
                                                     || !x.RoomServiceIndices.Any(y =>
                                                         y.ServiceId.Equals(service.Id) &&
                                                         y.Month.Equals(filterDto.CurrentDate.Month) &&
                                                         y.Year.Equals(filterDto.CurrentDate.Year))
            )
            .Select(x =>
            {
                var oldElectricValue = prevRoomServiceIndices.FirstOrDefault(y => y.RoomId.Equals(x.Id));
                var nextElectricValue = nextRoomServiceIndices.FirstOrDefault(y => y.RoomId.Equals(x.Id));
                return new RoomElectricServiceDto
                {
                    RoomId = x.Id,
                    RoomCode = x.RoomCode,
                    HouseName = x.House.Name,
                    CustomerName = x.Customers.FirstOrDefault()?.FullName ?? "",
                    Month = filterDto.CurrentDate.Month,
                    Year = filterDto.CurrentDate.Year,
                    OldElectricValue = oldElectricValue?.NewElectricValue ?? 0,
                    NewElectricValue = nextElectricValue?.OldElectricValue ?? 0,
                    UsedElectricValue = 0,
                    ServiceId = service.Id
                };
            }).ToList());
        // }


        return new PaginatedList<RoomElectricServiceDto>(
            result.OrderBy(x => x.HouseName).ThenBy(x => x.RoomCode).ToList(), count,
            filterDto.Offset,
            filterDto.Limit);
    }

    public async Task UpdateServiceIndex(RoomServiceIndexCreateUpdateDto updateDto)
    {
        var queryable = _roomServiceIndexRepository.GetQueryable();

        var nextMonth = new DateTime(updateDto.Year, updateDto.Month, 1).AddMonths(1);
        var preMonth = new DateTime(updateDto.Year, updateDto.Month, 1).AddMonths(-1);

        var prevValues = await queryable
            .Where(x => x.Month.Equals(preMonth.Month) && x.Year.Equals(preMonth.Year))
            .Where(x => x.ServiceId.Equals(updateDto.ServiceId))
            .FirstOrDefaultAsync(x => x.RoomId.Equals(updateDto.RoomId));

        var nextValues = await queryable
            .Where(x => x.Month.Equals(nextMonth.Month) && x.Year.Equals(nextMonth.Year))
            .Where(x => x.ServiceId.Equals(updateDto.ServiceId))
            .FirstOrDefaultAsync(x => x.RoomId.Equals(updateDto.RoomId));

        RoomServiceIndex roomServiceIndex = null;
        if (updateDto.Id.HasValue)
        {
            roomServiceIndex = await queryable.FirstOrDefaultAsync(x => x.Id.Equals(updateDto.Id));
            _mapper.Map<RoomServiceIndexCreateUpdateDto, RoomServiceIndex>(updateDto, roomServiceIndex);
            roomServiceIndex.LastModifiedBy = _currentUser.Id.ToString();
            roomServiceIndex.LastModifiedTime = DateTime.Now;
        }
        else
        {
            roomServiceIndex = _mapper.Map<RoomServiceIndexCreateUpdateDto, RoomServiceIndex>(updateDto);
            roomServiceIndex.CreatedBy = _currentUser.Id.ToString();
            roomServiceIndex.CreatedTime = DateTime.Now;
        }

        if (prevValues != null && updateDto.OldElectricValue.HasValue &&
            prevValues.NewElectricValue != updateDto.OldElectricValue)
        {
            prevValues.NewElectricValue = updateDto.OldElectricValue ?? 0;
            if (prevValues.NewElectricValue - prevValues.OldElectricValue < 0)
            {
                throw new Exception("Chỉ số cũ không hợp lệ");
            }

            prevValues.UsedElectricValue = prevValues.NewElectricValue - prevValues.OldElectricValue;
            prevValues.LastModifiedTime = DateTime.Now;
            prevValues.LastModifiedBy = _currentUser.Id.ToString();
            await _roomServiceIndexRepository.UpdateAsync(prevValues, true);
        }

        if (nextValues != null && updateDto.NewElectricValue.HasValue &&
            nextValues.OldElectricValue != updateDto.NewElectricValue)
        {
            nextValues.OldElectricValue = updateDto.NewElectricValue ?? 0;
            if (nextValues.NewElectricValue - nextValues.OldElectricValue < 0)
            {
                throw new Exception("Chỉ số mới không hợp lệ");
            }

            nextValues.UsedElectricValue = nextValues.NewElectricValue - nextValues.OldElectricValue;
            nextValues.LastModifiedTime = DateTime.Now;
            nextValues.LastModifiedBy = _currentUser.Id.ToString();
            await _roomServiceIndexRepository.UpdateAsync(nextValues, true);
        }

        await _roomServiceIndexRepository.UpdateAsync(roomServiceIndex, true);
    }

    public async Task ReturnRoom(Guid id)
    {
        var room = await _roomRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(id));
        if (room is null)
        {
            throw new Exception("Không tìm thấy phòng");
        }

        var contract = await _contractRepository.GetQueryable()
            .Include(x => x.Customer)
            .Where(x => x.EffectDate.HasValue && x.EffectDate.Value <= DateTime.Now)
            .Where(x => x.ExpiredDate.HasValue && x.ExpiredDate.Value >= DateTime.Now)
            .Where(x => !x.IsEarly)
            .FirstOrDefaultAsync(x => x.RoomId.Equals(id));
        if (contract is not null)
        {
            room.Status = nameof(RoomStatus.New);
            var roomProcess = new RoomProcess()
            {
                RoomId = room.Id,
                CustomerId = contract.CustomerId,
                Action = "Return",
                CreatedTime = DateTime.Now
            };


            if (DateTime.Now.Date < contract!.ExpiredDate!.Value.Date)
            {
                contract.IsEarly = true;
            }

            contract.CheckOutDate = DateTime.Now;
            contract.ExpiredDate = DateTime.Now.AddDays(-1);

            var customer = contract.Customer;


            await _roomRepository.UpdateAsync(room, true);
            await _contractRepository.UpdateAsync(contract, true);
            await _customerRepository.UpdateAsync(customer, true);
            await _roomProcessRepository.AddAsync(roomProcess, true);
        }
    }

    public async Task<PaginatedList<IncurredCostDto>> GetIncurredCosts(IncurredCostFilterDto filterDto)
    {
        var queryable = _incurredCostRepository.GetQueryable();

        queryable = queryable
            .WhereIf(filterDto.HouseId.HasValue, x => x.Room.HouseId.Equals(filterDto.HouseId))
            .WhereIf(filterDto.RoomId.HasValue, x => x.RoomId.Equals(filterDto.RoomId))
            .WhereIf(!string.IsNullOrEmpty(filterDto.RoomCode), x => x.Room.RoomCode.Contains(filterDto.RoomCode))
            .WhereIf(filterDto.Type.HasValue, x => x.Type.Equals(filterDto.Type))
            .WhereIf(filterDto.FromDate.HasValue,
                x => x.Date >= new DateTime(filterDto.FromDate.Value.Year, filterDto.FromDate.Value.Month, 1).Date)
            .WhereIf(filterDto.ToDate.HasValue,
                x => x.Date.Date <= new DateTime(filterDto.ToDate.Value.Year, filterDto.ToDate.Value.Month, 1).Date);

        var count = await queryable.CountAsync();

        var listIncurreds = await queryable
            .Include(x => x.Room)
            .Include(x => x.Room.House)
            .ToListAsync();

        var result = listIncurreds.Select(x => new IncurredCostDto
            {
                Id = x.Id,
                HouseId = x.Room.HouseId,
                RoomId = x.RoomId,
                RoomCode = x.Room.RoomCode,
                HouseName = x.Room.House.Name,
                Cost = x.Cost,
                Description = x.Description,
                Date = x.Date,
                Type = x.Type,
                IsPaid = x.IsPaid,
                CreatedBy = x.CreatedBy,
                CreatedTime = x.CreatedTime,
            })
            .OrderByDescending(x => x.Date)
            .ThenByDescending(x => x.CreatedTime)
            .ThenByDescending(x => x.HouseName)
            .ToList();

        return new PaginatedList<IncurredCostDto>(result, count, filterDto.PaginatedListQuery.Offset,
            filterDto.PaginatedListQuery.Limit);
    }

    public async Task CreateIncurredCost(CreateIncurredCostDto incurredCostDto)
    {
        var currentUserId = _currentUser.Id;
        if (incurredCostDto.RoomId == "All")
        {
            var rooms = await _roomRepository.GetQueryable()
                .Where(x => x.House.UserId.Equals(currentUserId))
                .WhereIf(!incurredCostDto.HouseId.Contains("All"),
                    x => x.HouseId.Equals(Guid.Parse(incurredCostDto.HouseId)))
                .ToListAsync();
            var newEntities = rooms.Select(x =>
            {
                var newEntity = new IncurredCost
                {
                    CreatedBy = _currentUser.Id.ToString(),
                    CreatedTime = DateTime.Now,
                    RoomId = x.Id,
                    Cost = incurredCostDto.Cost,
                    Description = incurredCostDto.Description,
                    Date = new DateTime(incurredCostDto.Date.Year, incurredCostDto.Date.Month, 1),
                    Type = incurredCostDto.Type
                };
                return newEntity;
            }).ToList();
            await _incurredCostRepository.AddRangeAsync(newEntities, true);
        }
        else
        {
            var newEntity = new IncurredCost
            {
                CreatedBy = _currentUser.Id.ToString(),
                CreatedTime = DateTime.Now,
                RoomId = Guid.Parse(incurredCostDto.RoomId),
                Cost = incurredCostDto.Cost,
                Description = incurredCostDto.Description,
                Date = new DateTime(incurredCostDto.Date.Year, incurredCostDto.Date.Month, 1),
                Type = incurredCostDto.Type
            };
            await _incurredCostRepository.AddAsync(newEntity, true);
        }
    }

    public async Task<IncurredCostDto> UpdateIncurredCost(UpdateIncurredCostDto incurredCostDto)
    {
        var oldEntity = await _incurredCostRepository.GetQueryable()
                            .AsNoTracking()
                            .FirstOrDefaultAsync(x => x.Id.Equals(incurredCostDto.Id)) ??
                        throw new Exception("Không tìm thấy chi phí phát sinh");

        var newEntity = _mapper.Map<UpdateIncurredCostDto, IncurredCost>(incurredCostDto);
        newEntity.Date = new DateTime(newEntity.Date.Year, newEntity.Date.Month, 1);
        newEntity.LastModifiedBy = _currentUser.Id.ToString();
        newEntity.LastModifiedTime = DateTime.Now;

        var result = await _incurredCostRepository.UpdateAsync(newEntity, true);
        return _mapper.Map<IncurredCost, IncurredCostDto>(result);
    }

    public Task DeleteIncurredCost(Guid id)
    {
        var queryable = _incurredCostRepository.GetQueryable();
        var incurredCost = queryable.FirstOrDefault(x => x.Id.Equals(id)) ??
                           throw new Exception("Không tìm thấy chi phí phát sinh");
        return _incurredCostRepository.DeleteAsync(incurredCost, true);
    }
}