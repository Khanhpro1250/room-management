namespace backend.DTOs.RoomDtos;

public class CalculateRoomRequestDto
{
    public string RoomId { get; set; }
    public string HouseId { get; set; }

    /// <summary>
    /// Tính tiền cho tháng
    /// </summary>
    public DateTime DateCalculate { get; set; }

    /// <summary>
    /// Thanh toán trước ngày này
    /// </summary>
    public DateTime DatePaymentBefore { get; set; }

    /// <summary>
    /// Tính lại tiền cho các phòng đã trả trong tháng
    /// </summary>
    public bool IsRecalculate { get; set; }
}