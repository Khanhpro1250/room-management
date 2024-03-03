namespace backend.DTOs.UserDtos;

public class UpdateUserProfileDto
{
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string IdentityNo { get; set; }
    public DateTime? IssueDate { get; set; }
    public string IssuePlace { get; set; }
    public string BankAccount { get; set; }
    public string BankAccountName { get; set; }
    public string BankBranch { get; set; }
    public int? CollectionFromDate { get; set; }
    public int? CollectionToDate { get; set; }
}