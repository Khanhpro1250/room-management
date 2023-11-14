using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;

namespace backend.Services.ContractServices
{
    public interface IContractService
    {
        Task<PaginatedList<ContractDto>> GetListContract(PaginatedListQuery paginatedListQuery);
        Task<ContractDto> GetContractById(Guid contractId);
        Task<ContractDto> CreateContract(CreateUpdateContractDto contract);
        Task<ContractDto> UpdateContract(CreateUpdateContractDto contract, Guid id);
        Task DeleteContract(Guid id);
        
        Task<ContractDto> GetCurrentContractRoomId(Guid roomId, Guid? customerId = null);

        Task<ExportContractDto> GetDataExportContract(CreateUpdateContractDto contractDto);
        
        Task<bool> ValidateContract(CreateUpdateContractDto contractDto, Guid? id = null);
    }
}