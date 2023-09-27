using AutoMapper;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.HouseDtos;
using backend.Models.Entities.Houses;
using backend.Models.Repositorties.HouseRerositories;
using MongoDB.Driver;

namespace backend.Services.HouseServices;

public class HouseService : IHouseService
{
    private readonly IHouseRepository _houseRepository;
    private readonly IMapper _mapper;

    public HouseService(IHouseRepository houseRepository, IMapper mapper)
    {
        _houseRepository = houseRepository;
        _mapper = mapper;
    }

    public async Task<HouseDto> CreateHouse(CreateUpdateHouseDto houseDto)
    {
        var house = _mapper.Map<CreateUpdateHouseDto, House>(houseDto);
        var result = await _houseRepository.CreateHouse(house);
        return _mapper.Map<House, HouseDto>(result);
    }

    public async Task<HouseDto> UpdateHouse(CreateUpdateHouseDto houseDto, string id)
    {
        var house = _mapper.Map<CreateUpdateHouseDto, House>(houseDto);
        var result = await _houseRepository.UpdateHouse(house, id);

        return _mapper.Map<House, HouseDto>(result);
    }

    public async Task DeleteHouse(string id)
    {
        await _houseRepository.DeleteHouse(id);
    }

    public async Task<PaginatedList<HouseDto>> GetListHouse()
    {
        var queryable = _houseRepository.GetQueryable();
        var listHouse = await queryable.Find(x => true).ToListAsync();
        var totalCount = listHouse.Count;
        return new PaginatedList<HouseDto>(_mapper.Map<List<House>, List<HouseDto>>(listHouse), totalCount, 0, 10);
    }

    public async Task<List<ComboOptionDto>> GetComboHouse()
    {
        var queryable = _houseRepository.GetQueryable();
        var listHouse = await queryable.Find(x => true).ToListAsync();
        var result = listHouse.Select(x => new ComboOptionDto()
        {
            Label = x.Name,
            Value = x.Id
        }).ToList();
        return result;
    }
}