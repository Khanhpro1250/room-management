using backend.Controllers.Dtos;
using backend.DTOs.ServiceDtos;

namespace backend.DTOs.CustomerDtos
{
    public class CustomerDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }

        public int Gender { get; set; }

        public string IdentityNo { get; set; }

        public DateTime? IssueDate { get; set; }

        public string PhoneNumber1 { get; set; }
        public string? PhoneNumber2 { get; set; }

        public string IssuePlace { get; set; }

        public string Email { get; set; }

        public string PermanentAddress { get; set; }

        public DateTime? Birthday { get; set; }

        public string BirthPlace { get; set; }

        public DateTime? RentalStartTime { get; set; }

        public float RoomCharge { get; set; }

        public float? Deposit { get; set; }

        public string VehicleNumber { get; set; }


        public string PaymentPeriod { get; set; }


        public int PaymentOneTime { get; set; }

        public string Note { get; set; }
        public string RoomId { get; set; }

        // [JsonProperty("fileUrls")] 
        public string FileUrls { get; set; }

        // [JsonProperty("members")] 
        public List<MemberDto> Members { get; set; }

        // [JsonProperty("services")] 
        public List<ServiceCustomerDto> Services { get; set; }

        public Guid? FileEntryCollectionId { get; set; }
        public FileEntryCollectionDto? FileEntryCollection { get; set; }
    }
}