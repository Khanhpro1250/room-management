using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.EnityConfigs;

public static class UserEntityConfig
{
    private const string SchemaName = "USER";

    public static ModelBuilder ConfigureUserEntities(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(User), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            entity.Property(x => x.IssueDate).IsRequired(false);
            entity.Property(x => x.DateOfBirth).IsRequired(false);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(Role), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable(nameof(UserRole), SchemaName);
            entity.HasKey(x => new
            {
                x.RoleId,
                x.UserId
            });
            
            entity
                .HasOne(x => x.User)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.UserId)
                ;
            entity
                .HasOne(x => x.Role)
                .WithMany(x => x.UserRole)
                .HasForeignKey(x => x.RoleId)
                ;
        });
        
        modelBuilder.Entity<Otp>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(Otp), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
        });


        return modelBuilder;
    }
}