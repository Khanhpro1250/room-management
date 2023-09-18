using backend.Models.Entities.Contracts;
using backend.Models.Entities.Customers;
using MongoDB.Driver;

namespace backend.Models.Repositorties.ContractRepositories
{
    public class ContractRepository : IContractRepository
    {
        private readonly IMongoCollection<Contract> _contract;
        public ContractRepository(IMongoClient client, string databaseName)
        {
            IMongoDatabase database = client.GetDatabase(databaseName);
            _contract = database.GetCollection<Contract>("Contract");
        }

        public async Task<List<Contract>> GetListContract()
        {
            return await _contract.Find(item => true).ToListAsync();
        }

        public async Task<Contract> GetContractById(string contractId)
        {
            var result = await _contract.Find(x => x.Id == contractId).FirstOrDefaultAsync();

            return result ?? new Contract();
        }

        public async Task<Contract> CreateContract(Contract contract)
        {
            await _contract.InsertOneAsync(contract);
            return contract;
        }

        public async Task<Contract> UpdateContract(Contract contract, string contractId)
        {
            var filter = Builders<Contract>.Filter.Eq(x => x.Id, contractId);
            await _contract.ReplaceOneAsync(filter, contract);
            return contract;
        }

        public async Task DeleteContract(string id)
        {
            var filter = Builders<Contract>.Filter.Eq(x => x.Id, id);
            await _contract.DeleteOneAsync(filter);
        }

        public IMongoCollection<Contract> GetQueryable()
        {
            return _contract;
        }
    }
}
