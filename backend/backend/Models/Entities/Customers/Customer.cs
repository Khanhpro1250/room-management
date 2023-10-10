using Newtonsoft.Json;

namespace backend.Models.Entities.Customers
{
    public class Customer : AuditedEntity
    {
        /// <summary>
        /// Họ và tên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// CMND/CCCD
        /// </summary>
        public string IdentityNo { get; set; }
        /// <summary>
        /// Ngày cấp
        /// </summary>
        public DateTime IssueDate { get; set; }
        /// <summary>
        /// Số điện thoại 1 - 2
        /// </summary>
        public string PhoneNumber1 { get; set; }
        public string? PhoneNumber2 { get; set; }
        /// <summary>
        /// Nơi cấp
        /// </summary>
        public string IssuePlace { get; set; }
        /// <summary>
        /// Địa chỉ Email 
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Địa chỉ thường trú
        /// </summary>
        public string PermanentAddress { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public string Birthday { get; set; }
        /// <summary>
        /// Nơi sinh
        /// </summary>
        public string BirthPlace { get; set; }
        /// <summary>
        /// Ngày bắt đầu thuê
        /// </summary>
        public DateTime RentalStartTime { get; set; }
        /// <summary>
        /// Tiền phòng
        /// </summary>
        public float RoomCharge { get; set; }
        /// <summary>
        /// Tiền cọc
        /// </summary>
        public float Deposit { get; set; }
        /// <summary>
        /// Biển số xe
        /// </summary>
        public string VehicleNumber { get; set; }
        /// <summary>
        /// Kỳ thành toán (thanh toán vào ngày ... mỗi tháng)
        /// </summary>
        public string PaymentPeriod { get; set; }
        
        /// <summary>
        /// Thanh toán mỗi lần / đơn vị  tháng
        /// </summary>
        public int PaymentOneTime { get; set; }
        /// <summary>
        /// Ghi chú
        /// </summary>
        public string Note { get; set; }
        public string RoomId { get; set; }
        /// <summary>
        /// Hình ảnh
        /// </summary>
        [JsonProperty("fileUrls")] 
        public List<string> FileUrls { get; set; }
    }
}