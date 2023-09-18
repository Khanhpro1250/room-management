namespace backend.DTOs.RoomDtos
{
    public class CreateUpdateRoomDto
    {
        public string Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }

        public string RoomTypeId { get; set; }
        public string RoomCode { get; set; }
        public string HouseID { get; set; }
        public int Number { get; set; }
        public string Acreage { get; set; }
        public int MaxNumberOfPeople { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public string ImgLink { get; set; }
        public string Status { get; set; }
        public float Deposit { get; set; }
        public string InteriorIds { get; set; }
    }
}
