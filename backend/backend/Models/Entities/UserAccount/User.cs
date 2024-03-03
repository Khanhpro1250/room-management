namespace backend.Models.Entities.UserAccount;

public class User : AuditedEntity<Guid>
{
    public string UserName { get; set; }
    public string UserCode { get; set; }
    public string PasswordHash { get; set; }
    public string FullName { get; set; }
    public string Salt { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string IdentityNo { get; set; }
    public DateTime? IssueDate { get; set; }
    public string IssuePlace { get; set; }
    public bool IsAdmin { get; set; }

    public int? CollectionFromDate { get; set; }
    public int? CollectionToDate { get; set; }

    public string BankAccount { get; set; }
    public string BankAccountName { get; set; }
    public string BankBranch { get; set; }
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}