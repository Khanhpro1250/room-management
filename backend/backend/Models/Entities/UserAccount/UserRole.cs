﻿namespace backend.Models.Entities.UserAccount;

public class UserRole
{
    public Guid RoleId { get; set; }
    public Role Role { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
}