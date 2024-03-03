namespace backend.DTOs.RoomDtos;

public class CalculateChargeDto
{
    public string HouseName { get; set; }
    public string CustomerName { get; set; }

    public string CustomerEmail { get; set; }
    public string HouseAddress { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public string RoomCode { get; set; }
    public string DateCalculate { get; set; }
    public string CalculateFromDate { get; set; }
    public string CalculateToDate { get; set; }
    public string? DateCustomerMoveIn { get; set; }
    public string TotalCost { get; set; }
    public string TotalCostWord { get; set; }

    public string BankAccount { get; set; }
    public string BankAccountName { get; set; }
    public string BankBranch { get; set; }
    public string PhoneNumber { get; set; }
    public List<CalculateChargeDetailDto> CalculateChargeDetails { get; set; }
}

public class CalculateChargeDetailDto
{
    public string Title { get; set; }
    public string Cost { get; set; }
    public string Description { get; set; }

    public bool IsHasDescription { get; set; }
}