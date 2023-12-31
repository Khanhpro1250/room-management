﻿namespace backend.Models.Entities.UserAccount;

public class Otp : AuditedEntity<Guid>
{
    public string Code { get; set; }
    public string EmailRequest { get; set; }
    public bool IsUsed { get; set; }
    public DateTime ExpriedTime { get; set; }
    public string Type { get; set; }
}