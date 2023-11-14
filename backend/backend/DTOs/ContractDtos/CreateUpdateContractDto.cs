namespace backend.DTOs.ContractDtos
{
    public class CreateUpdateContractDto
    {
        public string? Id { get; set; }
        public string ContractNumber { get; set; }
        public Guid RoomId { get; set; }
        public Guid CustomerId { get; set; }
        public int Month { get; set; }
        public DateTime SignedDate { get; set; }
        public DateTime EffectDate { get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}