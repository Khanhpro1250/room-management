using backend.Controllers.Dtos;
using Newtonsoft.Json;

namespace backend.DTOs.RoomDtos
{
    public class RoomDto
    {
        public Guid Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public string RoomTypeId { get; set; }
        public string RoomCode { get; set; }
        public string HouseId { get; set; }
        public int Number { get; set; }
        public string Acreage { get; set; }
        public int MaxNumberOfPeople { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        // [JsonProperty("fileUrls")] 
        public string FileUrls { get; set; }
        public string Status { get; set; }
        public float Deposit { get; set; }
        public string InteriorIds { get; set; }
        public string StatusName { get; set; }
        
        public Guid? FileEntryCollectionId { get; set; }
        public FileEntryCollectionDto? FileEntryCollection { get; set; }
    }
}