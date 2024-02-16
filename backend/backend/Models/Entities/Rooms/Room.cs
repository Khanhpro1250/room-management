using backend.Models.Entities.Customers;
using backend.Models.Entities.Files;
using backend.Models.Entities.Houses;

namespace backend.Models.Entities.Rooms
{
    public class Room : AuditedEntity<Guid>
    {
        public string RoomTypeId { get; set; }
        public string RoomCode { get; set; }
        public Guid HouseId { get; set; }
        public string Acreage { get; set; }
        public int MaxNumberOfPeople { get; set; }
        public float Price { get; set; }

        public string Description { get; set; }

        // [JsonProperty("fileUrls")] 
        public string FileUrls { get; set; }
        public string Status { get; set; }
        public float Deposit { get; set; }
        public string InteriorIds { get; set; }
        
        public Guid? FileEntryCollectionId { get; set; }
    
        public FileEntryCollection FileEntryCollection { get; set; }

        #region ref

        public House House { get; set; }

        public List<Customer> Customers { get; set; }
        public List<RoomServiceIndex> RoomServiceIndices { get; set; }
        
        public List<RoomProcess> RoomProcesses { get; set; }

        #endregion
    }
    
    public enum RoomStatus
    {
        New,
        Rented,
        Deposited,
    }
}