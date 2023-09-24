namespace backend.Models.Entities.Rooms
{
    public class Room: AuditedEntity
    {
        public string RoomTypeId { get; set; }
        public string RoomCode { get; set; }
        public string HouseId { get; set; }
        public int Number { get; set; }
        public string Acreage {  get; set; }
        public int MaxNumberOfPeople { get; set; }
        public float Price {  get; set; }
        public string Description { get; set; }
        public string ImgLink { get; set; }
        public string Status { get; set; }
        public float Deposit { get; set; }
        public string InteriorIds {  get; set; }
    }
}
