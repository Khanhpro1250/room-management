﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.Services;
using backend.Models.Repositorties.HouseRerositories;
using backend.Models.Repositorties.RoomRepositories;
using backend.Services.SendMailServices;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using Symbol;

namespace backend.Services.RoomServices;

public class CalculateChargeService : ICalculateChargeService
{
    private readonly ICalculateChargeRepository _calculateChargeRepository;
    private readonly IRoomRepository _roomRepository;
    private readonly IMapper _mapper;
    private readonly IHouseRepository _houseRepository;
    private readonly ICurrentUser _currentUser;
    private readonly ISendMailService _sendMailService;

    public CalculateChargeService(ICalculateChargeRepository calculateChargeRepository, IRoomRepository roomRepository,
        IMapper mapper, IHouseRepository houseRepository, ICurrentUser currentUser, ISendMailService sendMailService)
    {
        _calculateChargeRepository = calculateChargeRepository;
        _roomRepository = roomRepository;
        _mapper = mapper;
        _houseRepository = houseRepository;
        _currentUser = currentUser;
        _sendMailService = sendMailService;
    }

    public async Task<PaginatedList<CalculateChargeGridDto>> GetListCalculateCharge(CalculateChargeFilterDto filterDto)
    {
        var queryable = _calculateChargeRepository.GetQueryable();
        var currentUserId = _currentUser.Id;
        queryable = queryable
                .Where(x => x.Room.House.UserId.Equals(currentUserId))
                .WhereIf(filterDto.HouseId.HasValue, x => x.Room.HouseId == filterDto.HouseId)
                .WhereIf(filterDto.RoomId.HasValue, x => x.RoomId == filterDto.RoomId)
                .WhereIf(!string.IsNullOrEmpty(filterDto.RoomCode), x => x.Room.RoomCode.Contains(filterDto.RoomCode))
                .Where(x => x.DateCalculate.Date.Month == filterDto.DateTime.Month &&
                            x.DateCalculate.Date.Year == filterDto.DateTime.Year)
            ;

        var count = await queryable.CountAsync();
        var result = await queryable
            .ProjectTo<CalculateChargeGridDto>(_mapper.ConfigurationProvider)
            .OrderByDescending(x => x.DateCalculate)
            .ThenByDescending(x => x.CreatedTime)
            .ToListAsync();

        return new PaginatedList<CalculateChargeGridDto>(result, count, 0, -1);
    }

    public async Task DeleteCalculateCharge(Guid id)
    {
        var calculateCharge = await _calculateChargeRepository.GetQueryable().FirstOrDefaultAsync(x => x.Id == id);
        if (calculateCharge == null)
        {
            throw new NotFoundException("Không tìm thấy thông tin tính cước");
        }

        await _calculateChargeRepository.DeleteAsync(calculateCharge, true);
    }

    public async Task CalculateChargeRooms(CalculateRoomRequestDto calculateRoomRequestDto)
    {
        var listRooms = await GetListRoomsForCalculate(calculateRoomRequestDto);
        var listCalculateCharge = new List<RoomServiceCalculateDto>();
        foreach (var listRoom in listRooms)
        {
            var res = await CalculateRoomCharge(listRoom, calculateRoomRequestDto.DateCalculate);
            listCalculateCharge.AddRange(res);
        }

        var listCalculateChargeGroupByRoom = listCalculateCharge.GroupBy(x => x.RoomId).ToList();
        var calculateCharges = new List<CalculateCharge>();
        foreach (var calculateCharge in listCalculateChargeGroupByRoom)
        {
            var costs = calculateCharge.Sum(x => x.Cost ?? 0);
            var roomCost = calculateCharge.Sum(x => x.RoomCost ?? 0);
            var totalUnpaid = costs + roomCost;
            var calculateChargeEntity = new CalculateCharge()
            {
                RoomId = calculateCharge.Key,
                CustomerId = calculateCharge.First().CustomerId,
                DateCalculate = calculateRoomRequestDto.DateCalculate,
                TotalCost = costs + roomCost,
                TotalUnpaid = totalUnpaid,
                TotalPaid = 0
            };
            var calculateChargeDetails = calculateCharge.Select(x => new CalculateChargeDetail()
            {
                RoomServiceIndexId = x.RoomServiceIndexId,
                RoomCost = x.RoomServiceIndexId is null && x.ServiceId is null && x.IncurredCostId is null
                    ? roomCost
                    : 0,
                ServiceId = x.ServiceId,
                IncurredCostId = x.IncurredCostId
            }).ToList();
            calculateChargeEntity.CalculateChargeDetails = calculateChargeDetails;
            calculateCharges.Add(calculateChargeEntity);
        }

        var calculteChangeQueryable = _calculateChargeRepository.GetQueryable();

        var calculateForDeletes = await calculteChangeQueryable
            .Include(x => x.CalculateChargeDetails)
            .Where(x => calculateCharges.Select(y => y.RoomId).Contains(x.RoomId))
            .Where(x => x.DateCalculate.Date.Month == calculateRoomRequestDto.DateCalculate.Month &&
                        x.DateCalculate.Date.Year == calculateRoomRequestDto.DateCalculate.Year)
            .ToListAsync();
        if (calculateForDeletes.Any())
        {
            foreach (var calculateForDelete in calculateForDeletes)
            {
                await _calculateChargeRepository.DeleteAsync(calculateForDelete, true);
            }
        }

        await _calculateChargeRepository.AddRangeAsync(calculateCharges, true);
    }

    private async Task<List<RoomServiceCalculateDto>> CalculateRoomCharge(Room room, DateTime dateCalculate)
    {
        var listCharges = new List<RoomServiceCalculateDto>();
        var customers = room.Customers.ToList();

        var customer = customers
            .FirstOrDefault(x =>
                (x.Contracts.Any(y => y.EffectDate <= dateCalculate && y.ExpiredDate >= dateCalculate)) ||
                x.Contracts == null || x.Contracts.Count == 0);

        var roomServiceIndices = room?.RoomServiceIndices
            ?.Where(x => x.Month.Equals(dateCalculate.Month) && x.Year.Equals(dateCalculate.Year)).ToList();

        var roomElectricServiceIndices = roomServiceIndices?.Where(x => x.Service.Type.Equals("DIEN")).FirstOrDefault();
        var roomWaterServiceIndices = roomServiceIndices?.Where(x => x.Service.Type.Equals("NUOC")).FirstOrDefault();


        var incurredCosts = room?.IncurredCosts?
            .Where(x => x.Type.Equals(IncurredCostType.Customer))
            .Where(x => x.Date.Month.Equals(dateCalculate.Month) && x.Date.Year.Equals(dateCalculate.Year)).ToList();

        await CalculateRoomCost(room, dateCalculate, listCharges);

        var customerServices = customer?.Services?
            .Where(x => !x.Service.Type.Equals("DIEN") && !x.Service.Type.Equals("NUOC")).ToList();

        if (customerServices is not null)
        {
            await CalculateOrderServiceCharge(customerServices, listCharges);
        }

        if (roomElectricServiceIndices is not null)
        {
            await CalculateElectricCharge(roomElectricServiceIndices, customer, listCharges);
        }

        if (roomWaterServiceIndices is not null)
        {
            await CalculateWaterCharge(roomWaterServiceIndices, customer, listCharges);
        }

        if (incurredCosts is not null)
        {
            await CalculateIncurredCostsCharge(incurredCosts, listCharges);
        }

        foreach (var roomServiceCalculateDto in listCharges)
        {
            roomServiceCalculateDto.RoomId = room.Id;
            roomServiceCalculateDto.CustomerId = customer!.Id;
        }

        return listCharges;
    }

    #region Calculate Service Charge helper

    private Task CalculateRoomCost(Room room, DateTime dateCalculate,
        List<RoomServiceCalculateDto> roomServiceCalculateDtos)
    {
        var endDateOfMonth = DateTimeSpanExtension.GetEndOfMonth(dateCalculate);
        var dayAllMonths = endDateOfMonth.Day;
        var dayFromCaculateDate = dateCalculate.Day;
        var roomPrice = room.Price;
        var roomPricePerDay = roomPrice / dayAllMonths;
        var result = new RoomServiceCalculateDto()
        {
            RoomId = room.Id,
            RoomCost = (decimal)Math.Round(roomPricePerDay * dayFromCaculateDate)
        };

        roomServiceCalculateDtos.Add(result);
        return Task.CompletedTask;
    }

    private Task CalculateIncurredCostsCharge(List<IncurredCost> incurredCosts,
        List<RoomServiceCalculateDto> roomServiceCalculateDtos)
    {
        var result = incurredCosts.Select(x => new RoomServiceCalculateDto()
        {
            IncurredCostId = x.Id,
            Cost = x.Cost
        }).ToList();
        roomServiceCalculateDtos.AddRange(result);
        return Task.CompletedTask;
    }

    private Task CalculateOrderServiceCharge(List<ServiceCustomer> customerServices,
        List<RoomServiceCalculateDto> roomServiceCalculateDtos)
    {
        var result = customerServices.Select(x => new RoomServiceCalculateDto()
        {
            ServiceId = x.ServiceId,
            Cost = (decimal)x.Service.Price * (decimal)x.Quantity
        }).ToList();
        roomServiceCalculateDtos.AddRange(result);
        return Task.CompletedTask;
    }

    private Task
        CalculateElectricCharge(RoomServiceIndex roomElectricServiceIndice,
            Customer customer, List<RoomServiceCalculateDto> roomServiceCalculateDtos)
    {
        var customerService = customer.Services.FirstOrDefault(x => x.Service.Type.Equals("DIEN"));
        if (customerService is null)
            return null;
        var result = new RoomServiceCalculateDto()
        {
            RoomServiceIndexId = roomElectricServiceIndice.Id,
            ServiceId = roomElectricServiceIndice.ServiceId,
            Cost = (decimal)roomElectricServiceIndice.Service.Price * roomElectricServiceIndice.UsedElectricValue
        };
        roomServiceCalculateDtos.Add(result);
        return Task.CompletedTask;
    }

    private Task CalculateWaterCharge(RoomServiceIndex roomWaterServiceIndice,
        Customer customer, List<RoomServiceCalculateDto> roomServiceCalculateDtos)
    {
        var customerService = customer.Services.FirstOrDefault(x => x.Service.Type.Equals("NUOC"));
        if (customerService is null)
            return null;
        var result = new RoomServiceCalculateDto()
        {
            RoomServiceIndexId = roomWaterServiceIndice.Id,
            ServiceId = roomWaterServiceIndice.ServiceId,
            Cost = (decimal)roomWaterServiceIndice.Service.Price * roomWaterServiceIndice.UsedElectricValue
        };

        roomServiceCalculateDtos.Add(result);
        return Task.CompletedTask;
    }

    private async Task<List<Room>> GetListRoomsForCalculate(CalculateRoomRequestDto calculateRoomRequestDto)
    {
        var roomQueryable = _roomRepository.GetQueryable()
            ;
        var currentUserId = _currentUser.Id;

        if (calculateRoomRequestDto.HouseId.Equals("All"))
        {
            if (calculateRoomRequestDto.RoomId.Equals("All"))
            {
                roomQueryable = roomQueryable
                    .Where(x => x.House.UserId.Equals(currentUserId));
            }
            else
            {
                roomQueryable = roomQueryable
                        .Where(x => x.House.UserId.Equals(currentUserId))
                        .Where(x => x.Id == Guid.Parse(calculateRoomRequestDto.RoomId))
                    ;
            }
        }
        else
        {
            if (calculateRoomRequestDto.RoomId.Equals("All"))
            {
                roomQueryable = roomQueryable
                        .Where(x => x.HouseId.Equals(Guid.Parse(calculateRoomRequestDto.HouseId)))
                    ;
            }
            else
            {
                roomQueryable = roomQueryable
                        .Where(x => x.HouseId.Equals(Guid.Parse(calculateRoomRequestDto.HouseId)))
                        .Where(x => x.Id == Guid.Parse(calculateRoomRequestDto.RoomId))
                    ;
            }
        }


        var listRoom = await roomQueryable
            .Include(x => x.Customers)
            .ThenInclude(x => x.Contracts)
            .Include(x => x.IncurredCosts)
            .Include(x => x.RoomServiceIndices)
            .ThenInclude(x => x.Service)
            .Include(x => x.Customers)
            .ThenInclude(x => x.Services)
            .ThenInclude(x => x.Service)
            .ToListAsync();
        listRoom = listRoom.Where(x => x.Customers != null &&
                                       x.Customers.Any() &&
                                       x.Customers.Any(y =>
                                           y.Contracts != null &&
                                           y.Contracts.Any() &&
                                           y.Contracts.MaxBy(z => z.CreatedTime).ExpiredDate >=
                                           calculateRoomRequestDto.DateCalculate &&
                                           y.Contracts.MaxBy(z => z.CreatedTime).EffectDate <=
                                           calculateRoomRequestDto.DateCalculate)).ToList();

        return listRoom;
    }

    #endregion


    public async Task UpdateCalculateCharge(UpdateCalculateChargeDto calculateChargeDto)
    {
        var queryable = _calculateChargeRepository.GetQueryable();
        var calculateCharge = await queryable
            .Include(x => x.CollectMoneyProcesses)
            .FirstOrDefaultAsync(x => x.Id == calculateChargeDto.Id);
        if (calculateCharge == null)
        {
            throw new NotFoundException("Không tìm thấy thông tin tính cước");
        }

        calculateCharge.TotalPaid = calculateChargeDto.MoneyCollect;
        calculateCharge.TotalUnpaid = calculateCharge.TotalCost - calculateCharge.TotalPaid;

        var process = new CollectMoneyProcess()
        {
            CalculateChargeId = calculateCharge.Id,
            Money = calculateChargeDto.MoneyCollect,
            CollectTime = calculateChargeDto.DateCollectMoney,
            CreatedBy = _currentUser.UserName
        };

        var collectMoneyProcesses = calculateCharge.CollectMoneyProcesses ?? new List<CollectMoneyProcess>();
        collectMoneyProcesses.Add(process);
        calculateCharge.LastDateCollectMoney = calculateChargeDto.DateCollectMoney;
        calculateCharge.CollectMoneyProcesses = collectMoneyProcesses;

        await _calculateChargeRepository.UpdateAsync(calculateCharge, true);
    }

    public async Task<CalculateChargeDto> GetDetailCalculateCharge(Guid id)
    {
        var queryable = _calculateChargeRepository.GetQueryable();
        var calculateCharge = await queryable
            .Include(x => x.Customer)
            .ThenInclude(x => x.Services)
            .Include(x => x.Room)
            .ThenInclude(x => x.House)
            .Include(x => x.CalculateChargeDetails)
            .ThenInclude(x => x.RoomServiceIndex)
            .ThenInclude(x => x.Service)
            .Include(x => x.CalculateChargeDetails)
            .ThenInclude(x => x.Service)
            .Include(x => x.CalculateChargeDetails)
            .ThenInclude(x => x.IncurredCost)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (calculateCharge == null)
        {
            throw new NotFoundException("Không tìm thấy thông tin tính cước");
        }

        var calculateChargeDetailList = new List<CalculateChargeDetailDto>();

        var calculateChargeDetails =
            calculateCharge?.CalculateChargeDetails?.ToList() ?? new List<CalculateChargeDetail>();


        foreach (var item in calculateChargeDetails)
        {
            var title = "";
            var description = "";
            var cost = 0m;

            if (item.RoomServiceIndexId.HasValue)
            {
                if (item.RoomServiceIndex.Service.Type.Equals("DIEN") ||
                    item.RoomServiceIndex.Service.Type.Equals("NUOC"))
                {
                    var customerService =
                        calculateCharge.Customer.Services.FirstOrDefault(x =>
                            x.ServiceId == item.RoomServiceIndex.ServiceId);
                    title = item.RoomServiceIndex.Service.Name;
                    description =
                        $"CS cũ: {item.RoomServiceIndex.OldElectricValue} - CS mới: {item.RoomServiceIndex.NewElectricValue} - SD: {item.RoomServiceIndex.UsedElectricValue} ";
                    cost = (decimal)(customerService?.Price ?? 0) * item.RoomServiceIndex.UsedElectricValue;
                }
            }
            else if (item.ServiceId.HasValue)
            {
                var customerService =
                    calculateCharge.Customer.Services.FirstOrDefault(x => x.ServiceId == item.ServiceId);
                title = item.Service.Name;
                description = $"Số lượng: {customerService?.Quantity ?? 0}";
                cost = (decimal)((customerService?.Price ?? 0) * (customerService?.Quantity ?? 0));
            }
            else if (item.IncurredCostId.HasValue)
            {
                title = item.IncurredCost.Description;
                cost = item.IncurredCost.Cost;
            }
            else if (item.RoomCost > 0)
            {
                title = "Tiền nhà";
                cost = item.RoomCost;
                description =
                    $"từ ngày {new DateTime(calculateCharge.DateCalculate.Year, calculateCharge.DateCalculate.Month, 1):dd/MM/yyyy} đến ngày {calculateCharge.DateCalculate:dd/MM/yyyy}";
            }

            var calculateChargeDetail = new CalculateChargeDetailDto
            {
                Title = title,
                Description = description,
                Cost = MoneyConverter.ToLocaleDotString(cost),
                IsHasDescription = !string.IsNullOrEmpty(description)
            };
            if (calculateChargeDetail.Title.Equals("Tiền nhà"))
            {
                calculateChargeDetailList.Insert(0, calculateChargeDetail);
            }
            else
            {
                calculateChargeDetailList.Add(calculateChargeDetail);
            }
        }


        var result = new CalculateChargeDto
        {
            HouseName = calculateCharge.Room.House.Name,
            CustomerName = calculateCharge.Customer.FullName,
            CustomerEmail = calculateCharge.Customer.Email,
            HouseAddress = calculateCharge.Room.House.Location,
            RoomCode = calculateCharge.Room.RoomCode,
            Month = calculateCharge.DateCalculate.Month,
            Year = calculateCharge.DateCalculate.Year,
            DateCalculate = calculateCharge.DateCalculate.ToString("dd/MM/yyyy"),
            CalculateFromDate =
                new DateTime(calculateCharge.DateCalculate.Year, calculateCharge.DateCalculate.Month, 1).ToString(
                    "dd/MM/yyyy"),
            CalculateToDate = calculateCharge.DateCalculate.ToString("dd/MM/yyyy"),
            DateCustomerMoveIn = calculateCharge.Customer.CreatedTime?.ToString("dd/MM/yyyy"),
            TotalCost = MoneyConverter.ToLocaleDotString(calculateCharge.TotalCost),
            TotalCostWord = MoneyConverter.ConvertToMoneyString(calculateCharge.TotalCost),
            CalculateChargeDetails = calculateChargeDetailList
        };

        return result;
    }

    public async Task SendBillCalculateCharge(Guid id)
    {
        var getData = await GetDetailCalculateCharge(id);
        var caculateDetails = getData.CalculateChargeDetails;
        var details = "";
        foreach (var item in caculateDetails)
        {
            var index = caculateDetails.IndexOf(item) + 1;
            var detailItem = $@"<div style=""margin-bottom: 0.25rem;"">
                <div style=""font-size: 0.6rem; color: #0d1e66;float: left;"">{index}. {item.Title} {(!string.IsNullOrEmpty(item.Description) ? $"( {item.Description} )" : "")}</div>             
<div style=""font-size: 0.75rem; color: #0d1e66;float:right"">{item.Cost}</div>
<div style=""clear: both;""></div>   
              </div>";
            details += detailItem;
        }

        var htmlContent = $@"<!DOCTYPE html>
<html lang=""en"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
</head>
<body style=""margin: 0; padding: 0;background-color: #a4abae80"">
  <div style=""padding: 0.5rem;"">
    <div>
      <span style=""font-size: 0.75rem; color: #0d1e66; font-weight: bold;"">Nhà: {getData?.HouseName}</span>
    </div>
    <div style=""margin-bottom: 0.25rem;"">
      <div style=""font-size: 0.75rem; color: #0d1e66; font-weight: bold;float: left;"">{getData?.HouseAddress}</div>
      <div style=""font-size: 0.75rem; color: #0d1e66; float: right;"">{getData?.DateCalculate}</div>
<div style=""clear: both;""></div>  
    </div>
    <div>
      <div style=""text-transform: uppercase; font-size: 1.25rem; color: #0d1e66; font-weight: bold; margin-top: 0.5rem; text-align: center;"">Hóa đơn tiền nhà</div>
      <div>
        <div style=""font-size: 0.75rem; color: #0d1e66; font-weight: bold; margin-top: 0.5rem; text-align: center;"">Tháng {getData?.Month}/{getData?.Year}</div>
        <div style=""font-size: 0.75rem; color: #0d1e66; text-align: center;"">(từ ngày {getData?.CalculateFromDate} đến ngày {getData?.CalculateToDate})</div>
      </div>
    </div>
    <div style=""margin-bottom: 0.5rem;"">
      <div style=""font-size: 0.75rem; margin-bottom: 0.25rem; color: #0d1e66; font-weight: bold;"">Họ và tên: {getData?.CustomerName}</div>
      <div style=""font-size: 0.75rem; margin-bottom: 0.25rem; color: #0d1e66; font-weight: bold;"">Phòng: {getData?.RoomCode}</div>
      <div style=""font-size: 0.75rem; margin-bottom: 0.25rem; color: #0d1e66; font-weight: bold;"">Ngày vào: {getData?.DateCustomerMoveIn}</div>
    </div>
    <hr />
    <div className=""mt-2 mb-2"">
    {details}
    </div>
    <hr />
     <div style=""margin-bottom: 0.5rem;"">
      <div style=""font-size: 1.5rem; color: #0d1e66; font-weight: bold; float: left;"">Tổng cộng</div>
      <div style=""font-size: 1.5rem; color: #0d1e66; font-weight: bold; float: right;"">{getData.TotalCost}</div>
      <div style=""clear: both;""></div>
      <div style=""float: right;""><i style=""font-size: 0.75rem; color: #0d1e66;"">( Bằng chữ : {getData.TotalCostWord})</i></div>
      <div style=""clear: both;""></div>
    </div>
  </div>
</body>
</html>
";
        await _sendMailService.SendMail(getData?.CustomerEmail ?? "khanhpro1250@gmail.com",
            $"[{getData.CustomerName}] Tiền trọ tháng {getData?.Month}/{getData?.Year}", htmlContent);
    }
}