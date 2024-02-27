using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.DepositDtos;

namespace backend.Services.DepositServices;

public interface IDepositService
{
    Task<PaginatedList<DepositDto>> GetListDeposit(PaginatedListQuery paginatedListQuery);
    Task CreateDeposit(CreateUpdateDepositDto deposit);
    Task UpdateDeposit(CreateUpdateDepositDto deposit, Guid id);
    Task DeleteDeposit(Guid id);
}