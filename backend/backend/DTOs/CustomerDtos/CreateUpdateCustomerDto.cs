namespace backend.DTOs.CustomerDtos
{
    public class CreateUpdateCustomerDto
    {
        public string UserId { get; set; }
        public string RoomId { get; set; }
        public string ContractId { get; set; }
        public bool IsRepresent { get; set; }
        public string IdentityNumber { get; set; }
        public string IdentityImgLink { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
    }
}
