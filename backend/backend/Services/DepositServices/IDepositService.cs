using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.DepositDtos;

namespace backend.Services.DepositServices
{
    public interface IDepositService
    {
        Task<PaginatedList<DepositDto>> GetListDeposit();
        Task<DepositDto> GetDepositById(string customerId);
        Task<DepositDto> CreateDeposit(CreateUpdateDepositDto deposit);
        Task<DepositDto> UpdateDeposit(CreateUpdateDepositDto deposit, string id);
        Task DeleteDeposit(string id);
    }
}
