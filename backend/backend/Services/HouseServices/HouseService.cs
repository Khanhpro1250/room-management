using AutoMapper;
using backend.DTOs.HouseDtos;
using backend.Models.Entities.Houses;
using backend.Models.Repositorties.HouseRerositories;

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
}