using backend.Models.Entities.Customers;
using backend.Models.Entities.Deposits;
using MongoDB.Driver;

namespace backend.Models.Repositorties.DepositRepositories
{
    public class DepositRepository : IDepositRepository
    {
        private readonly IMongoCollection<Deposit> _deposit;
        public DepositRepository(IMongoClient client, string databaseName)
        {
            IMongoDatabase database = client.GetDatabase(databaseName);
            _deposit = database.GetCollection<Deposit>("Deposit");
        }

        public async Task<List<Deposit>> GetListDeposit()
        {
            return await _deposit.Find(item => true).ToListAsync();
        }

        public async Task<Deposit> GetDepositById(string depositId)
        {
            var result = await _deposit.Find(x => x.Id == depositId).FirstOrDefaultAsync();

            return result ?? new Deposit();
        }

        public async Task<Deposit> CreateDeposit(Deposit deposit)
        {
            await _deposit.InsertOneAsync(deposit);
            return deposit;
        }

        public async Task<Deposit> UpdateDeposit(Deposit deposit, string depositId)
        {
            var filter = Builders<Deposit>.Filter.Eq(x => x.Id, depositId);
            await _deposit.ReplaceOneAsync(filter, deposit);
            return deposit;
        }

        public async Task DeleteDeposit(string id)
        {
            var filter = Builders<Deposit>.Filter.Eq(x => x.Id, id);
            await _deposit.DeleteOneAsync(filter);
        }

        public IMongoCollection<Deposit> GetQueryable()
        {
            return _deposit;
        }
    }
}
