namespace backend.DTOs.UserDtos;

public class UserDto
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string UserCode { get; set; }
    public string FullName { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string IdentityNo { get; set; }
    public DateTime? IssueDate { get; set; }
    public string IssuePlace { get; set; }
    public bool IsAdmin { get; set; }
    public string BankAccount { get; set; }
    public string BankAccountName { get; set; }
    public string BankBranch { get; set; }

    public int? CollectionFromDate { get; set; }
    public int? CollectionToDate { get; set; }

    public string CreatedBy { get; set; }
    public DateTime? CreatedTime { get; set; }
    public string LastModifiedBy { get; set; }
    public DateTime? LastModifiedTime { get; set; }
}