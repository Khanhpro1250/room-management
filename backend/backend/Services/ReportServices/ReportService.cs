using Aspose.Words.Lists;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.DTOs.ReportDtos;
using backend.DTOs.RoomDtos;
using backend.Models.Entities.Rooms;
using backend.Models.Repositorties.RoomRepositories;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver.Linq;

namespace backend.Services.ReportServices;

public class ReportService : IReportService
{
    private readonly IRoomRepository _roomRepository;
    private readonly ICurrentUser _currentUser;
    private readonly ICalculateChargeRepository _calculateChargeRepository;
    private readonly IMapper _mapper;

    public ReportService(IRoomRepository roomRepository, ICurrentUser currentUser,
        ICalculateChargeRepository calculateChargeRepository, IMapper mapper)
    {
        _roomRepository = roomRepository;
        _currentUser = currentUser;
        _calculateChargeRepository = calculateChargeRepository;
        _mapper = mapper;
    }

    public async Task<List<ReportRoomStateDto>> GetReportRoomState(DateTime? filterDateTime)
    {
        var queryable = _roomRepository.GetQueryable();
        var currentUserId = _currentUser.Id;
        var listRoom = await queryable
            .Where(x => x.CreatedBy.Contains(currentUserId.ToString()))
            .Include(x => x.House)
            .Include(x => x.Customers)
            .ThenInclude(x => x.Contracts)
            .ToListAsync();

        var contracts = listRoom.SelectMany(x => x.Customers).SelectMany(x => x.Contracts).ToList();
        var result = new List<ReportRoomStateDto>();
        foreach (var item in listRoom)
        {
            var data = new ReportRoomStateDto
            {
                Id = item.Id,
                RoomCode = item.RoomCode,
                HouseName = item.House.Name
            };

            var contract = contracts
                .Where(x => x.EffectDate <= DateTime.Now)
                .Where(x => x.ExpiredDate >= DateTime.Now)
                .Where(x => !x.IsEarly)
                .FirstOrDefault(x => x.RoomId.Equals(item.Id));
            if (contract is not null)
            {
                data.StatusCode = "RENT";
                data.StatusName = "Đang thuê";
            }
            else
            {
                data.StatusCode = "NEW";
                data.StatusName = "Phòng trống";
            }

            result.Add(data);
        }

        return result;
    }

    public async Task<List<ReportRoomRevenueDto>> GetReportRoomRevenue(DateTime? filterDateTime)
    {
        var date = filterDateTime ?? DateTime.Now;
        var queryable = _calculateChargeRepository.GetQueryable();
        var currentUserId = _currentUser.Id;
        queryable = queryable
                .Where(x => x.Room.House.UserId.Equals(currentUserId))
                .Where(x => x.DateCalculate.Date.Month == date.Month &&
                            x.DateCalculate.Date.Year == date.Year)
            ;

        var dataCalculateCharges = await queryable
            .ProjectTo<CalculateChargeGridDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        var result = new List<ReportRoomRevenueDto>();
        var dataCalculateChargesByMonths = dataCalculateCharges
            .GroupBy(x => new DateTime(x.DateCalculate.Year, x.DateCalculate.Month, 1));

        foreach (var item in dataCalculateChargesByMonths)
        {
            var data = new ReportRoomRevenueDto
            {
                Month = new MonthDto()
                {
                    Month = item.Key.Month,
                    Year = item.Key.Year
                }
            };

            var datacalculateChargesByHouse = item.GroupBy(x => x.HouseId);

            var listDetails = new List<ReportRevenueDetailDto>();

            foreach (var dataHouseItem in datacalculateChargesByHouse)
            {
                var revenue = dataHouseItem.Sum(x => x.TotalPaid);
                listDetails.Add(new ReportRevenueDetailDto()
                {
                    HouseName = dataHouseItem.Select(x => x.HouseName).FirstOrDefault(),
                    HouseId = dataHouseItem.Key,
                    Month = item.Key.Month,
                    Year = item.Key.Year,
                    Revenue = revenue
                });
            }

            data.Details = listDetails;
            result.Add(data);
        }

        return result;
    }
}