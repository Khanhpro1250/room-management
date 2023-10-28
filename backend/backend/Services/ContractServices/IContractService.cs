using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;

namespace backend.Services.ContractServices
{
    public interface IContractService
    {
        Task<PaginatedList<ContractDto>> GetListContract();
        Task<ContractDto> GetContractById(string contractId);
        Task<ContractDto> CreateContract(CreateUpdateContractDto contract);
        Task<ContractDto> UpdateContract(CreateUpdateContractDto contract, string id);
        Task DeleteContract(string id);

        Task<ContractDto> GetCurrentContractRoomId(string roomId, string? customerId = null);

        Task<bool> ValidateContract(CreateUpdateContractDto contractDto, string id);
    }
}