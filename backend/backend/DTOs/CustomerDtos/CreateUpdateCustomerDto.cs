using Newtonsoft.Json;

namespace backend.DTOs.CustomerDtos
{
    public class CreateUpdateCustomerDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }

        public string IdentityNo { get; set; }

        public DateTime IssueDate { get; set; }

        public string PhoneNumber1 { get; set; }
        public string? PhoneNumber2 { get; set; }

        public string IssuePlace { get; set; }

        public string Email { get; set; }

        public string PermanentAddress { get; set; }

        public string Birthday { get; set; }

        public string BirthPlace { get; set; }

        public DateTime RentalStartTime { get; set; }

        public float RoomCharge { get; set; }

        public float Deposit { get; set; }

        public string VehicleNumber { get; set; }


        public string PaymentPeriod { get; set; }


        public int PaymentOneTime { get; set; }

        public string Note { get; set; }
        public string RoomId { get; set; }

        [JsonProperty("fileUrls")] public List<string> FileUrls { get; set; }
    }
}