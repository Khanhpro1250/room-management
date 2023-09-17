namespace backend.DTOs.UserDtos;

public class CreateUpdateUserDtos
{
    public string Id { get; set; }
    public string CreatedBy { get; set; }
    public DateTime? CreatedTime { get; set; }
    public string LastModifiedBy { get; set; }
    public DateTime? LastModifiedTime { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; }
    public string UserCode { get; set; }
    public string PasswordHash { get; set; }
    public string FullName { get; set; }
    public string Salt { get; set; }
    public string EmailAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public bool IsAdmin { get; set; }
}