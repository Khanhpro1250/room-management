using backend.Models.Entities.Notifications;
using MongoDB.Driver;

namespace backend.Models.Repositorties.NotificationRepositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly IMongoCollection<Notification> _notification;
        public NotificationRepository(IMongoClient client, string databaseName)
        {
            IMongoDatabase database = client.GetDatabase(databaseName);
            _notification = database.GetCollection<Notification>("Notification");
        }

        public async Task<List<Notification>> GetListNotification()
        {
            return await _notification.Find(item => true).ToListAsync();
        }

        public async Task<Notification> GetNotificationById(string notificationId)
        {
            var result = await _notification.Find(x => x.Id == notificationId).FirstOrDefaultAsync();

            return result ?? new Notification();
        }

        public async Task<Notification> CreateNotification(Notification notification)
        {
            await _notification.InsertOneAsync(notification);
            return notification;
        }

        public async Task<Notification> UpdateNotification(Notification notification, string notificationId)
        {
            var filter = Builders<Notification>.Filter.Eq(x => x.Id, notificationId);
            await _notification.ReplaceOneAsync(filter, notification);
            return notification;
        }

        public async Task DeleteNotification(string id)
        {
            var filter = Builders<Notification>.Filter.Eq(x => x.Id, id);
            await _notification.DeleteOneAsync(filter);
        }

        public IMongoCollection<Notification> GetQueryable()
        {
            return _notification;
        }
    }
}
