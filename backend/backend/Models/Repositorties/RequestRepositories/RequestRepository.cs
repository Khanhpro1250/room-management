using backend.Models.Entities.Customers;
using backend.Models.Entities.Requests;
using MongoDB.Driver;

namespace backend.Models.Repositorties.RequestRepositories
{
    public class RequestRepository : IRequestRepository
    {
        // private readonly IMongoCollection<Request> _request;
        // public RequestRepository(IMongoClient client, string databaseName)
        // {
        //     IMongoDatabase database = client.GetDatabase(databaseName);
        //     _request = database.GetCollection<Request>("Request");
        // }
        //
        // public async Task<List<Request>> GetListRequest()
        // {
        //     return await _request.Find(item => true).ToListAsync();
        // }
        //
        // public async Task<Request> GetRequestById(string requestId)
        // {
        //     var result = await _request.Find(x => x.Id == requestId).FirstOrDefaultAsync();
        //
        //     return result ?? new Request();
        // }
        //
        // public async Task<Request> CreateRequest(Request request)
        // {
        //     await _request.InsertOneAsync(request);
        //     return request;
        // }
        //
        // public async Task<Request> UpdateRequest(Request request, string requestId)
        // {
        //     var filter = Builders<Request>.Filter.Eq(x => x.Id, requestId);
        //     await _request.ReplaceOneAsync(filter, request);
        //     return request;
        // }
        //
        // public async Task DeleteRequest(string id)
        // {
        //     var filter = Builders<Request>.Filter.Eq(x => x.Id, id);
        //     await _request.DeleteOneAsync(filter);
        // }
        //
        // public IMongoCollection<Request> GetQueryable()
        // {
        //     return _request;
        // }
    }
}
