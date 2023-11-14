namespace backend.Models.Entities.UserAccount;

public class Role: AuditedEntity<Guid>
{
    public string Name { get; set; }
    public string Code { get; set; }
    public bool Used { get; set; }
    public ICollection<UserRole> UserRole { get; set; }
}