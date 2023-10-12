using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;
using backend.Models.Entities.Rooms;
using backend.Models.Repositorties.RoomRepositories;
using backend.Services.CloudinaryServices;
using backend.Services.CustomerServices;
using backend.Services.ServiceServices;
using backend.Utils;
using MongoDB.Driver;

namespace backend.Services.RoomServices;

public class RoomService : IRoomService
{
    private readonly IRoomRepository _roomRepository;
    private readonly IMapper _mapper;
    private readonly ICloudinaryService _cloudinaryService;
    private readonly ICustomerService _customerService;
    public readonly IServiceService _serviceService;

    public RoomService(IRoomRepository roomRepository, IMapper mapper, ICloudinaryService cloudinaryService,
        ICustomerService customerService, IServiceService serviceService)
    {
        _roomRepository = roomRepository;
        _mapper = mapper;
        _cloudinaryService = cloudinaryService;
        _customerService = customerService;
        _serviceService = serviceService;
    }

    public async Task<RoomDto> CreateRoom(CreateUpdateRoomDto room)
    {
        var roomEntity = _mapper.Map<CreateUpdateRoomDto, Room>(room);
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

        var filter = filterBuilder.And(
            filterBuilder.WhereIf(!string.IsNullOrWhiteSpace(filterDto.RoomCode),
                x => x.RoomCode.Contains(filterDto.RoomCode)),
            filterBuilder.Eq(x => x.HouseId, filterDto.HouseId)
            // Add other conditions as needed
        );
        var listRoom = await queryable
            .Find(filter)
            .Limit(filterDto.Limit)
            .Skip(filterDto.Offset)
            .ToListAsync();
        var result = _mapper.Map<List<Room>, List<RoomDto>>(listRoom);
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
        var result = await _roomRepository.UpdateRoom(newEntity, id);
        var listFileDelete = oldRoom.FileUrls.Except(room.FileUrls).ToList();
        if (listFileDelete.Any())
        {
            await _cloudinaryService.DeleteFileCloudinary(listFileDelete);
        }

        return _mapper.Map<Room, RoomDto>(result);
    }


    public Task<DataWithRoomDto> GetDataWithRoom(string roomId)
    {
        throw new NotImplementedException();
    }
}