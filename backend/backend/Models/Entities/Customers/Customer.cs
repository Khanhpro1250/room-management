using backend.Models.Entities.Contracts;
using backend.Models.Entities.Files;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.Services;
using Newtonsoft.Json;

namespace backend.Models.Entities.Customers
{
    public class Customer : AuditedEntity<Guid>
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
        public DateTime? IssueDate { get; set; }
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
        public DateTime? Birthday { get; set; }
        /// <summary>
        /// Nơi sinh
        /// </summary>
        public string BirthPlace { get; set; }
        /// <summary>
        /// Ngày bắt đầu thuê
        /// </summary>
        public DateTime? RentalStartTime { get; set; }
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
        
        public Guid RoomId { get; set; }
        
        /// <summary>
        /// Trạng thái ( active; inactive ) đang thuê / đã thuê
        /// </summary>
        public bool Status { get; set; }
        /// <summary>
        /// Hình ảnh
        /// </summary>
        // [JsonProperty("fileUrls")] 
        public string FileUrls { get; set; }
        
        public Guid? FileEntryCollectionId { get; set; }
    
        public FileEntryCollection FileEntryCollection { get; set; }



        #region ref

        public Room Room { get; set; }
        
        public List<Contract> Contracts { get; set; }
        
        // [JsonProperty("members")] 
        public List<Member> Members { get; set; }
        
        // [JsonProperty("services")] 
        public List<ServiceCustomer> Services { get; set; }
        
        public List<RoomServiceIndex> RoomServiceIndices { get; set; }

        #endregion
    }
    
    public class Member : Entity
    {
        public string Name { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string IdentityNo { get; set; }
        public string PermanentAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string VehicleNumber { get; set; }
        /// <summary>
        /// Ngày đăng kí thường trú
        /// </summary>
        public DateTime? TemporarilyDate { get; set; }

        #region ref

        public Customer Customer { get; set; }

        #endregion
        
    }
}

