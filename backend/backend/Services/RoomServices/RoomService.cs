using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Contanst;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RoomDtos;
using backend.DTOs.ServiceDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.Services;
using backend.Models.Repositorties.ContractRepositories;
using backend.Models.Repositorties.HouseRerositories;
using backend.Models.Repositorties.RoomRepositories;
using backend.Services.CloudinaryServices;
using backend.Services.ContractServices;
using backend.Services.CustomerServices;
using backend.Services.FileServices;
using backend.Services.ServiceServices;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

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


    public RoomService(IRoomRepository roomRepository, IMapper mapper, ICloudinaryService cloudinaryService,
        ICustomerService customerService, IServiceService serviceService, ICurrentUser currentUser,
        IContractRepository contractRepository, IFileService fileService)
    {
        _roomRepository = roomRepository;
        _mapper = mapper;
        _cloudinaryService = cloudinaryService;
        _customerService = customerService;
        _serviceService = serviceService;
        _currentUser = currentUser;
        _contractRepository = contractRepository;
        _fileService = fileService;
    }

    public async Task<RoomDto> CreateRoom(CreateUpdateRoomDto room)
    {
        var roomEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
        roomEntity.CreatedBy = _currentUser.Id.ToString();
        roomEntity.CreatedTime = DateTime.Now;
        
        if (room.FileEntryCollection.Any())
        {
            // var fileCollectionId = await CreateFileCollection(request, cancellationToken);
            var fileCollectionId = await _fileService.CreateFileCollection(room.FileEntryCollection,
                BucketConstant.UploadFiles);

            roomEntity.FileEntryCollectionId = fileCollectionId;
        }
        
        var result = await _roomRepository.AddAsync(roomEntity, true);
        return _mapper.Map<Room, RoomDto>(result);
    }

    public async Task DeleteRoom(Guid id)
    {
        var room = await _roomRepository.GetQueryable().AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id));
        await _roomRepository.DeleteAsync(room, true);
    }

    public async Task<PaginatedList<RoomDto>> GetListRoom(RoomFiterDto filterDto)
    {
        var queryable = _roomRepository.GetQueryable();
        var currentUserId = _currentUser.Id;


        var listRoom = await queryable
            .WhereIf(!String.IsNullOrEmpty(filterDto.RoomCode), x => x.RoomCode.Contains(filterDto.RoomCode))
            .WhereIf(filterDto.HouseId.HasValue, x => x.HouseId.Equals(x.HouseId))
            .WhereIf(!_currentUser.IsAdmin, x => x.CreatedBy.Contains(currentUserId.ToString()))
            .WhereIf(!String.IsNullOrEmpty(filterDto.Status) && filterDto.Status == "NEW", x => x.Customers.Any())
            .WhereIf(!String.IsNullOrEmpty(filterDto.Status) && filterDto.Status == "RENTED", x => !x.Customers.Any())
            .WhereIf(!String.IsNullOrEmpty(filterDto.CustomerName),
                x => x.Customers.Any(y => y.Status && y.FullName.Contains(filterDto.CustomerName)))
            .Include(x => x.Customers)
            .Include(x=> x.FileEntryCollection.FileEntries)
            .QueryablePaging(filterDto.PaginatedListQuery)
            .ToListAsync();

        var count = await queryable.CountAsync();

        var result = new List<RoomDto>();
        foreach (var item in listRoom)
        {
            var roomDto = _mapper.Map<Room, RoomDto>(item);
            if (item.Customers.Any())
            {
                roomDto.Status = "RENTED";
                roomDto.StatusName = "Đã cho thuê";
            }
            else
            {
                roomDto.Status = "NEW";
                roomDto.StatusName = "Còn trống";
            }

            result.Add(roomDto);
        }

        return new PaginatedList<RoomDto>(result, count, filterDto.PaginatedListQuery.Offset,
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
            room.FileEntryCollection, listDeletedFileIds,  BucketConstant.UploadFiles);
        var result = await _roomRepository.UpdateAsync(newEntity, true);
        // var listFileDelete = oldRoom.FileUrls.Split(',').Except(room.FileUrls).ToList();
        // if (listFileDelete.Any())
        // {
        //     await _cloudinaryService.DeleteFileCloudinary(listFileDelete);
        // }

        return _mapper.Map<Room, RoomDto>(result);
    }


    public async Task<DataWithRoomDto> GetDataWithRoom(Guid roomId)
    {
        var queryable = _roomRepository.GetQueryable();

        var room = await queryable
            .AsNoTracking()
            .Include(x => x.Customers)
            .ThenInclude(x => x.Members)
            .Include(x => x.Customers)
            .ThenInclude(x => x.Services)
            .Include(x => x.Customers)
            .ThenInclude(x=> x.FileEntryCollection.FileEntries)
            .AsNoTrackingWithIdentityResolution()
            .Include(x => x.Customers)
            .FirstOrDefaultAsync(x => x.Id.Equals(roomId));
        var customer = room?.Customers.FirstOrDefault(x => x.Status.Equals(true));
        ContractDto contract = null;
        if (customer is not null)
        {
            contract = await _contractRepository.GetQueryable()
                .AsNoTracking()
                .Where(x => x.CustomerId.Equals(customer.Id))
                .ProjectTo<ContractDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.EffectDate <= DateTime.Now && x.ExpiredDate >= DateTime.Now);
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


    public async Task<List<RoomElectricServiceDto>> GetElectricServiceRoom(ElectricServiceFilterDto filterDto)
    {
        var currentUserId = _currentUser.Id;
        var roomQueryable = _roomRepository.GetQueryable();
        var result = await roomQueryable
            .Include(x => x.House)
            .Where(x => x.House.UserId.Equals(currentUserId))
            .WhereIf(filterDto.HouseId.HasValue, x => x.HouseId.Equals(filterDto.HouseId))
            .WhereIf(filterDto.Status != Status.All, x => x.Status.Equals(nameof(filterDto.Status)))
            .Select(x => new RoomElectricServiceDto
            {
                RoomId = x.Id,
                CustomerId = x.Customers.FirstOrDefault(y => y.Status.Equals(true)).Id,
                RoomCode = x.RoomCode,
                HouseName = x.House.Name,
                CustomerName = x.Customers.FirstOrDefault(y => y.Status.Equals(true)).FullName,
                Month = 0,
                Year = 0,
                OldElectricValue = 0,
                NewElectricValue = 0,
                UsedElectricValue = 0
            })
            .ToListAsync();


        return result;
    }
}