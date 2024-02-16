using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.HouseDtos;
using backend.Models.Entities.Houses;
using backend.Models.Repositorties.HouseRerositories;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace backend.Services.HouseServices;

public class HouseService : IHouseService
{
    private readonly IHouseRepository _houseRepository;
    private readonly IMapper _mapper;
    private readonly ICurrentUser _currentUser;

    public HouseService(IHouseRepository houseRepository, IMapper mapper, ICurrentUser currentUser)
    {
        _houseRepository = houseRepository;
        _mapper = mapper;
        _currentUser = currentUser;
    }

    public async Task<HouseDto> CreateHouse(CreateUpdateHouseDto houseDto)
    {
        var house = _mapper.Map<CreateUpdateHouseDto, House>(houseDto);
        house.CreatedTime = DateTime.Now;
        var result = await _houseRepository.AddAsync(house, true);
        return _mapper.Map<House, HouseDto>(result);
    }

    public async Task<HouseDto> UpdateHouse(CreateUpdateHouseDto houseDto, Guid id)
    {
        var findHouse =
            await _houseRepository.GetQueryable().AsNoTracking().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
            throw new Exception("Không tìm thấy nhà");
        var house = _mapper.Map<CreateUpdateHouseDto, House>(houseDto);
        var result = await _houseRepository.UpdateAsync(house, true);

        return _mapper.Map<House, HouseDto>(result);
    }

    public async Task DeleteHouse(Guid id)
    {
        var findHouse =
            await _houseRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id.Equals(id)) ??
            throw new Exception("Không tìm thấy nhà");
        await _houseRepository.DeleteAsync(findHouse, true);
    }

    public async Task<PaginatedList<HouseDto>> GetListHouse(PaginatedListQuery paginatedListQuery)
    {
        var currUserId = _currentUser.Id;
        var queryable = _houseRepository.GetQueryable();
        var listHouse = await queryable
            .Where(x => x.UserId.Equals(currUserId))
            .ProjectTo<HouseDto>(_mapper.ConfigurationProvider)
            .OrderBy(x => x.CreatedTime)
            .ToListAsync();
        var totalCount = await queryable.CountAsync();
        return new PaginatedList<HouseDto>(listHouse, totalCount, 0, -1);
    }

    public async Task<List<ComboOptionDto>> GetComboHouse(bool isByCurrentUserId = false)
    {
        var currUserId = _currentUser.Id;
        var queryable = _houseRepository.GetQueryable();
        var result = await queryable
            .WhereIf(isByCurrentUserId,x => x.UserId.Equals(currUserId))
            .Select(x => new ComboOptionDto()
            {
                Label = x.Name,
                Value = x.Id
            }).ToListAsync();
        return result;
    }
}