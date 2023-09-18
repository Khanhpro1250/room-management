using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;
using backend.DTOs.CustomerDtos;

namespace backend.Services.ContractServices
{
    public interface IContractService
    {
        Task<PaginatedList<ContractDto>> GetListContract();
        Task<ContractDto> GetContractById(string contractId);
        Task<ContractDto> CreateContract(CreateUpdateContractDto contract);
        Task<ContractDto> UpdateContract(CreateUpdateContractDto contract, string id);
        Task DeleteContract(string id);
    }
}
