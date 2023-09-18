using backend.Models.Entities.Rooms;
using backend.Models.Entities.UserAccount;
using MongoDB.Driver;

namespace backend.Models.Repositorties.RoomRepositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly IMongoCollection<Room> _room;
        public RoomRepository(IMongoClient client, string databaseName)
        {
            IMongoDatabase database = client.GetDatabase(databaseName);
            _room = database.GetCollection<Room>("Room");
        }

        public async Task<List<Room>> GetListRoom()
        {
            return await _room.Find(item => true).ToListAsync();
        }

        public async Task<Room> GetRoomById(string roomId)
        {
            var result = await _room.Find(x => x.Id == roomId).FirstOrDefaultAsync();

            return result ?? new Room();
        }

        public async Task<Room> CreateRoom(Room room)
        {
            await _room.InsertOneAsync(room);
            return room;
        }

        public async Task<Room> UpdateRoom(Room room, string roomId)
        {
            var filter = Builders<Room>.Filter.Eq(x => x.Id, roomId);
            var update = Builders<Room>.Update
                .Set(x => x, room);
            await _room.UpdateOneAsync(filter, update);
            return room;
        }
        public async Task DeleteRoom(string id)
        {
            var filter = Builders<Room>.Filter.Eq(x => x.Id, id);
            await _room.DeleteOneAsync(filter);
        }

        public IMongoCollection<Room> GetQueryable()
        {
            return _room;
        }
    }
}
