namespace backend.DTOs.ContractDtos
{
    public class ContractDto
    {
        public string ContractNumber { get; set; }
        public string RoomId { get; set; }
        public string CustomerId { get; set; }
        public int Month { get; set; }
        public DateTime SignedDate { get; set; }
        public DateTime EffectDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
    }
}