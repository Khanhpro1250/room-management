using backend.Models.Entities.Contracts;
using backend.Models.Entities.Customers;
using MongoDB.Driver;

namespace backend.Models.Repositorties.ContractRepositories
{
    public interface IContractRepository
    {
        Task<List<Contract>> GetListContract();
        Task<Contract> GetContractById(string contractId);
        Task<Contract> CreateContract(Contract contract);
        Task<Contract> UpdateContract(Contract contract, string id);
        IMongoCollection<Contract> GetQueryable();
        Task DeleteContract(string id);
    }
}
