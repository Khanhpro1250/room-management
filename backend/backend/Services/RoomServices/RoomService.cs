using AutoMapper;
using AutoMapper.QueryableExtensions;
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


    public RoomService(IRoomRepository roomRepository, IMapper mapper, ICloudinaryService cloudinaryService,
        ICustomerService customerService, IServiceService serviceService, ICurrentUser currentUser,
        IContractRepository contractRepository)
    {
        _roomRepository = roomRepository;
        _mapper = mapper;
        _cloudinaryService = cloudinaryService;
        _customerService = customerService;
        _serviceService = serviceService;
        _currentUser = currentUser;
        _contractRepository = contractRepository;
    }

    public async Task<RoomDto> CreateRoom(CreateUpdateRoomDto room)
    {
        var roomEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
        roomEntity.CreatedBy = _currentUser.Id.ToString();
        roomEntity.CreatedTime = DateTime.Now;
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
        var room = await _roomRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(roomId));
        var result = _mapper.Map<Room, RoomDto>(room);
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

        var result = await _roomRepository.UpdateAsync(newEntity, true);
        var listFileDelete = oldRoom.FileUrls.Split(',').Except(room.FileUrls).ToList();
        if (listFileDelete.Any())
        {
            await _cloudinaryService.DeleteFileCloudinary(listFileDelete);
        }

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


    // public  Task<List<RoomElectricServiceDto>> GetElectricServiceRoom(ElectricServiceFilterDto filterDto)
    // {
    //     // var currentUserId = _currentUser.Id;
    //     // var houseQueryable = _houseRepository.GetQueryable();
    //     // var roomQueryable = _roomRepository.GetQueryable();
    //     // var filterHouseBuilder = Builders<House>.Filter;
    //     // var filterRoomBuilder = Builders<Room>.Filter;
    //     // var listHouse = await houseQueryable
    //     //     .Find(
    //     //         filterHouseBuilder.And(
    //     //             filterHouseBuilder.WhereIf(String.IsNullOrEmpty(filterDto.HouseId),
    //     //                 x => filterDto.HouseId.Equals(x.Id)),
    //     //             filterHouseBuilder.Where(x => x.UserId.Equals(currentUserId))
    //     //         )
    //     //     )
    //     //     .ToListAsync();
    //     // var listHouseId = listHouse.Select(x => x.Id).ToList();
    //     // var listRoom = await roomQueryable.Find(filterRoomBuilder.And(
    //     //     filterRoomBuilder.WhereIf(filterDto.Status != Status.All, x => x.Status == nameof(filterDto.Status)),
    //     //     filterRoomBuilder.Where(x => listHouseId.Contains(x.HouseId))
    //     // )).ToListAsync();
    //
    //     var result = new List<RoomElectricServiceDto>();
    //
    //
    //     return result;
    // }
}