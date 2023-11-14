using backend.Models.Entities.Rooms;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.RoomRepositories;

public class RoomRepository : EfCoreRepository<ApplicationDbContext, Room>, IRoomRepository
{
    private readonly ApplicationDbContext _context;

    public RoomRepository(IServiceProvider serviceProvider, ApplicationDbContext context) : base(
        serviceProvider, context)
    {
        _context = context;
    }
    // private readonly IMongoCollection<Room> _room;
    // public RoomRepository(IMongoClient client, string databaseName)
    // {
    //     IMongoDatabase database = client.GetDatabase(databaseName);
    //     _room = database.GetCollection<Room>("Room");
    // }
    //

    //
    // public async Task<Room> GetRoomById(string roomId)
    // {
    //     var result = await _room.Find(x => x.Id == roomId).FirstOrDefaultAsync();
    //
    //     return result ?? new Room();
    // }
    //
    // public async Task<Room> CreateRoom(Room room)
    // {
    //     await _room.InsertOneAsync(room);
    //     return room;
    // }
    //
    // public async Task<Room> UpdateRoom(Room room, string roomId)
    // {
    //     var filter = Builders<Room>.Filter.Eq(x => x.Id, roomId);
    //     await _room.ReplaceOneAsync(filter, room);
    //     return room;
    // }
    //
    // public async Task DeleteRoom(string id)
    // {
    //     var filter = Builders<Room>.Filter.Eq(x => x.Id, id);
    //     await _room.DeleteOneAsync(filter);
    // }
    //
    // public IMongoCollection<Room> GetQueryable()
    // {
    //     return _room;
    // }
    public DbSet<Room> GetRepository()
    {
        return _context.Set<Room>();
    }

    public IQueryable<Room> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}