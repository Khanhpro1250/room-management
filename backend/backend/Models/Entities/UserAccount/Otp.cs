namespace backend.Models.Entities.UserAccount;

public class Otp : AuditedEntity<Guid>
{
    public string Code { get; set; }
    public string IsUsed { get; set; }
    public DateTime ExpriedTime { get; set; }
    public string Name { get; set; }
}