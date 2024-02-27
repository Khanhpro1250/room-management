using System.Diagnostics;
using AutoMapper;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.DepositDtos;
using backend.Models.Entities.Deposits;
using backend.Models.Repositorties.DepositRepositories;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.DepositServices;

public class DepositService : IDepositService
{
    private readonly IDepositRepository _depositRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IMapper _mapper;

    public DepositService(IDepositRepository depositRepository, ICurrentUser currentUser, IMapper mapper)
    {
        _depositRepository = depositRepository;
        _currentUser = currentUser;
        _mapper = mapper;
    }

    public async Task<PaginatedList<DepositDto>> GetListDeposit(PaginatedListQuery paginatedListQuery)
    {
        var queryable = _depositRepository.GetQueryable();
        var currentUserId = _currentUser.Id;
        var count = await queryable.CountAsync();
        var listDeposit = await queryable
            .Where(x => x.CreatedBy.Contains(currentUserId.ToString()))
            .Include(x => x.Room.House)
            .QueryablePaging(paginatedListQuery)
            .ToListAsync();
        var results = _mapper.Map<List<Deposit>, List<DepositDto>>(listDeposit);
        foreach (var item in results)
        {
            if (item.DepositDate.Date < DateTime.Now.Date && item.ExpectedDate!.Value.Date < DateTime.Now.Date &&
                item.Status == "DEPOSIT")
            {
                item.Status = "EXPIRED";
            }
            else
            {
                item.Status = "DEPOSIT";
            }

            item.StatusName = item.Status switch
            {
                "DEPOSIT" => "Đã đặt cọc",
                "EXPIRED" => "Hết hạn nhận phòng",
                _ => ""
            };
        }

        return new PaginatedList<DepositDto>(results, count, paginatedListQuery.Offset, paginatedListQuery.Limit);
    }

    public async Task CreateDeposit(CreateUpdateDepositDto depositDto)
    {
        var deposit = _mapper.Map<CreateUpdateDepositDto, Deposit>(depositDto);
        deposit.CreatedTime = DateTime.Now;
        deposit.CreatedBy = _currentUser.Id.ToString();
        deposit.Status = "DEPOSIT";
        await _depositRepository.AddAsync(deposit, true);
    }

    public async Task UpdateDeposit(CreateUpdateDepositDto depositDto, Guid id)
    {
        var queryable = _depositRepository.GetQueryable();
        var deposit = await queryable.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Deposit not found");
        _mapper.Map(depositDto, deposit);
        deposit.LastModifiedTime = DateTime.Now;
        deposit.LastModifiedBy = _currentUser.Id.ToString();
        await _depositRepository.UpdateAsync(deposit, true);
    }

    public async Task DeleteDeposit(Guid id)
    {
        var queryable = _depositRepository.GetQueryable();
        var deposit = await queryable.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Deposit not found");
        await _depositRepository.DeleteAsync(deposit, true);
    }
}