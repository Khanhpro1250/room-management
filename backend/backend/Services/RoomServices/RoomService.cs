using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;
using backend.Models.Entities.Rooms;
using backend.Models.Repositorties.RoomRepositories;
using backend.Services.CloudinaryServices;
using backend.Services.ContractServices;
using backend.Services.CustomerServices;
using backend.Services.ServiceServices;
using backend.Services.UserServices;
using backend.Utils;
using MongoDB.Driver;

namespace backend.Services.RoomServices;

public class RoomService : IRoomService
{
    private readonly IRoomRepository _roomRepository;
    private readonly IMapper _mapper;
    private readonly ICloudinaryService _cloudinaryService;
    private readonly ICustomerService _customerService;
    private readonly IServiceService _serviceService;
    private readonly ICurrentUser _currentUser;
    private readonly IContractService _contractService;

    public RoomService(IRoomRepository roomRepository, IMapper mapper, ICloudinaryService cloudinaryService,
        ICustomerService customerService, IServiceService serviceService, ICurrentUser currentUser,
        IContractService contractService)
    {
        _roomRepository = roomRepository;
        _mapper = mapper;
        _cloudinaryService = cloudinaryService;
        _customerService = customerService;
        _serviceService = serviceService;
        _currentUser = currentUser;
        _contractService = contractService;
    }

    public async Task<RoomDto> CreateRoom(CreateUpdateRoomDto room)
    {
        var roomEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
        roomEntity.CreatedBy = _currentUser.Id;
        roomEntity.CreatedTime = DateTime.Now;
        var result = await _roomRepository.CreateRoom(roomEntity);
        return _mapper.Map<Room, RoomDto>(result);
    }

    public async Task DeleteRoom(string id)
    {
        await _roomRepository.DeleteRoom(id);
    }

    public async Task<PaginatedList<RoomDto>> GetListRoom(RoomFilterDto filterDto)
    {
        var queryable = _roomRepository.GetQueryable();
        var filterBuilder = Builders<Room>.Filter;
        var currentUserId = _currentUser.Id;

        var filter = filterBuilder.And(
            filterBuilder.WhereIf(!string.IsNullOrWhiteSpace(filterDto.RoomCode),
                x => x.RoomCode.Contains(filterDto.RoomCode)),
            filterBuilder.Eq(x => x.HouseId, filterDto.HouseId),
            filterBuilder.WhereIf(!_currentUser.IsAdmin, x => x.CreatedBy.Contains(currentUserId))
        );
        var listRoom = await queryable
            .Find(filter)
            .Limit(filterDto.Limit)
            .Skip(filterDto.Offset)
            .ToListAsync();
        var listRoomId = listRoom.Select(x => x.Id).ToList();
        var listRoomRented = await GetListRoomIdRented(listRoomId);

        var result = _mapper.Map<List<Room>, List<RoomDto>>(listRoom);

        foreach (var item in result)
        {
            if (listRoomRented.Contains(item.Id))
            {
                item.Status = "RENTED";
                item.StatusName = "Đã cho thuê";
            }
            else
            {
                item.Status = "NEW";
                item.StatusName = "Còn trống";
            }
        }

        return new PaginatedList<RoomDto>(result, result.Count, filterDto.Offset, filterDto.Limit);
    }

    public async Task<RoomDto> GetRoomById(string roomId)
    {
        var room = await _roomRepository.GetRoomById(roomId);
        var result = _mapper.Map<Room, RoomDto>(room);
        return result;
    }

    public async Task<RoomDto> UpdateRoom(CreateUpdateRoomDto room, string id)
    {
        var oldRoom = await _roomRepository.GetRoomById(id);
        var newEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
        newEntity.LastModifiedBy = _currentUser.Id;
        newEntity.LastModifiedTime = DateTime.Now;

        var result = await _roomRepository.UpdateRoom(newEntity, id);
        var listFileDelete = oldRoom.FileUrls.Except(room.FileUrls).ToList();
        if (listFileDelete.Any())
        {
            await _cloudinaryService.DeleteFileCloudinary(listFileDelete);
        }

        return _mapper.Map<Room, RoomDto>(result);
    }


    public async Task<DataWithRoomDto> GetDataWithRoom(string roomId)
    {
        var customer = await _customerService.GetCustomerByRoomId(roomId);
        var listServices = await _serviceService.GetListServiceRegister();
        var contract = await _contractService.GetCurrentContractRoomId(roomId, customer.Id);
        return new DataWithRoomDto()
        {
            Customer = customer,
            ListServices = listServices,
            Services = customer.Services,
            Contract = contract
        };
    }

    private async Task<List<string>> GetListRoomIdRented(List<string> roomIds)
    {
        var listCustomers = await _customerService.GetCustomerByRoomIds(roomIds);
        return listCustomers.Select(x => x.RoomId).Distinct().ToList();
    }
}