using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ReportDtos;
using backend.DTOs.RoomDtos;
using backend.Models.Entities.Rooms;
using backend.Models.Repositorties.ContractRepositories;
using backend.Models.Repositorties.CustomerRepositories;
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
    private readonly IContractRepository _contractRepository;
    private readonly IUserService _userService;
    private readonly IIncurredCostRepository _incurredCostRepository;
    private readonly ICustomerRepository _customerRepository;

    private readonly IMapper _mapper;

    public ReportService(IRoomRepository roomRepository, ICurrentUser currentUser,
        ICalculateChargeRepository calculateChargeRepository, IMapper mapper, IContractRepository contractRepository,
        IUserService userService, IIncurredCostRepository incurredCostRepository,
        ICustomerRepository customerRepository)
    {
        _roomRepository = roomRepository;
        _currentUser = currentUser;
        _calculateChargeRepository = calculateChargeRepository;
        _mapper = mapper;
        _contractRepository = contractRepository;
        _userService = userService;
        _incurredCostRepository = incurredCostRepository;
        _customerRepository = customerRepository;
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

    public async Task<List<ReportRoomRevenueDto>> GetReportRoomRevenue(ReportFilterDto filterDto)
    {
        var startDate = DateTimeSpanExtension.GetStartOfMonth(filterDto.DateTime ?? DateTime.Now);
        var endDate = DateTimeSpanExtension.GetEndOfMonth(DateTime.Now);
        var queryable = _calculateChargeRepository.GetQueryable();

        var dataReturnEarlyRes = await _contractRepository.GetQueryable()
            .Where(x => x.IsEarly)
            .Where(x => x.CheckOutDate.HasValue)
            .Select(x => new
            {
                DateCheckOut = x.CheckOutDate,
                Deposit = x.Customer.Deposit ?? 0,
                HouseId = x.Room.HouseId,
                HouseName = x.Room.House.Name
            })
            .ToListAsync();

        var dataReturnEarly =
            dataReturnEarlyRes.GroupBy(x => new DateTime(x.DateCheckOut.Value.Year, x.DateCheckOut.Value.Month, 1));

        var currentUserId = _currentUser.Id;
        queryable = queryable
                .Where(x => x.Room.House.UserId.Equals(currentUserId))
                .Where(x => x.DateCalculate.Date <= endDate)
                .Where(x => x.DateCalculate.Date >= startDate)
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

        foreach (var item in dataReturnEarly)
        {
            var data = new ReportRoomRevenueDto
            {
                Month = new MonthDto()
                {
                    Month = item.Key.Month,
                    Year = item.Key.Year
                }
            };
            var dataReturnEarlyByHouse = item.GroupBy(x => x.HouseId);

            var listDetails = new List<ReportRevenueDetailDto>();

            foreach (var dataHouseItem in dataReturnEarlyByHouse)
            {
                var revenue = dataHouseItem.Sum(x => (decimal)x.Deposit);
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

    public async Task<PaginatedList<ReportContractExpireDto>> GetContractExpired(DateTime? filterDateTime)
    {
        var currentUserId = _currentUser.Id;

        var customers = await _customerRepository.GetQueryable()
            .Where(x => x.Room.House.UserId.Equals(currentUserId))
            .Include(x => x.Contracts)
            .Include(x => x.Room.House)
            .ToListAsync();

        var result = customers
            .Where(x =>
            {
                var effectDate = x.Contracts.MaxBy(y => y.CreatedTime).EffectDate;
                return effectDate != null &&
                       effectDate.Value <= DateTime.Now;
            })
            .Where(x =>
            {
                var expiredDate = x.Contracts.MaxBy(y => y.CreatedTime).ExpiredDate;
                return expiredDate != null && expiredDate.Value.Date >= DateTime.Now.Date &&
                       (expiredDate.Value - DateTime.Now).TotalDays <= 30;
            })
            .Select(x =>
            {
                var expiredDate = x.Contracts.MaxBy(y => y.CreatedTime).ExpiredDate;

                return new ReportContractExpireDto
                {
                    CustomerId = x.Id,
                    CustomerName = x.FullName,
                    ExpiredDate = expiredDate,
                    CustomerEmail = x.Email,
                    HouseName = x.Room.House.Name,
                    RoomCode = x.Room.RoomCode,
                    ContractNumber = x.Contracts.MaxBy(y => y.CreatedTime).ContractNumber,
                    NumberOfDayToExpire =
                        expiredDate != null ? (expiredDate.Value.Date - DateTime.Now.Date).TotalDays : 0,
                };
            })
            .ToList();


        // var contracts = await _contractRepository.GetQueryable()
        //     .Where(x => x.Room.House.UserId.Equals(currentUserId))
        //     .Include(x => x.Customer)
        //     .Where(x => !x.IsEarly)
        //     .Where(x => x.EffectDate.HasValue && x.EffectDate.Value.Date <= DateTime.Now.Date)
        //     // .Where(x => x.ExpiredDate.HasValue && (x.ExpiredDate.Value.Date - DateTime.Now.Date).TotalDays <= 30)
        //     .ProjectTo<ReportContractExpireDto>(_mapper.ConfigurationProvider)
        //     .ToListAsync();
        //
        // contracts = contracts.Where(x =>
        //     x.ExpiredDate.HasValue && (x.ExpiredDate.Value.Date - DateTime.Now.Date).TotalDays <= 30).ToList();
        // foreach (var item in contracts)
        // {
        //     item.NumberOfDayToExpire = (item.ExpiredDate!.Value.Date - DateTime.Now.Date).TotalDays;
        // }


        return new PaginatedList<ReportContractExpireDto>(result, result.Count, 0, -1);
    }

    public async Task<List<ReportRoomRevenueDto>> GetReportRoomTotalSpendAmount(ReportFilterDto filterDto)
    {
        var startDate = DateTimeSpanExtension.GetStartOfMonth(filterDto.DateTime ?? DateTime.Now);
        var endDate = DateTimeSpanExtension.GetEndOfMonth(DateTime.Now);
        var queryable = _incurredCostRepository.GetQueryable();
        var currentUserId = _currentUser.Id;
        queryable = queryable
                .Where(x => x.Type == IncurredCostType.Owner)
                .Where(x => x.Room.House.UserId.Equals(currentUserId))
                .Where(x => x.Date.Date <= endDate.Date)
                .Where(x => x.Date.Date >= startDate.Date)
            ;

        var dataIncurredCosts = await queryable
            .ProjectTo<IncurredCostDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        var result = new List<ReportRoomRevenueDto>();
        var dataCalculateChargesByMonths = dataIncurredCosts
            .GroupBy(x => new DateTime(x.Date.Year, x.Date.Month, 1));

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
                var cost = dataHouseItem.Sum(x => x.Cost);
                listDetails.Add(new ReportRevenueDetailDto()
                {
                    HouseName = dataHouseItem.Select(x => x.HouseName).FirstOrDefault(),
                    HouseId = dataHouseItem.Key,
                    Month = item.Key.Month,
                    Year = item.Key.Year,
                    Revenue = cost
                });
            }

            data.Details = listDetails;
            result.Add(data);
        }

        return result;
    }
}