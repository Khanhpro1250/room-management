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
}