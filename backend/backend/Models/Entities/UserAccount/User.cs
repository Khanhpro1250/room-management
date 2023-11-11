using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models.Entities.UserAccount;

public class User: AuditedEntity
{
    public string UserName { get; set; }
    public string UserCode { get; set; }
    public string PasswordHash { get; set; }
    public string FullName { get; set; }
    public string Salt { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string IdentityNo { get; set; }
    public DateTime IssueDate { get; set; }
    public string IssuePlace { get; set; }
    public bool IsAdmin { get; set; }
}