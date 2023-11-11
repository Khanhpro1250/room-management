namespace backend.DTOs.ContractDtos;

public class ExportContractDto
{
    public string ContractNumber { get; set; }
    public string SignedDate { get; set; }
    public int Month { get; set; }
    public string EffectDate { get; set; }
    public string CurrentDay { get; set; } = DateTime.Now.Day.ToString();
    public string CurrentMonth { get; set; } = DateTime.Now.Month.ToString();
    public string CurrentYear { get; set; } = DateTime.Now.Year.ToString();
    
    public RoomExportDto Room { get; set; }
    public CustomerExportDto Customer { get; set; }
    public UserExportDto User { get; set; }
}

public class UserExportDto
{
    public string FullName { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
}

public class RoomExportDto
{
    public int Number { get; set; }
    public string Price { get; set; }
    public string PriceWord { get; set; }
}

public class CustomerExportDto
{
    public string FullName { get; set; }
    public string DateOfBirth { get; set; }
    public string IdentityNo { get; set; }
    public string IssueDate { get; set; }
    public string PermanentAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Deposit { get; set; }
    public string DepositWord { get; set; }
}