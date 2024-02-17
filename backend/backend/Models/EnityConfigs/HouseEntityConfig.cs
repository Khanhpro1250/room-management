using backend.Models.Entities.Contracts;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Houses;
using backend.Models.Entities.Rooms;
using backend.Models.Entities.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.EnityConfigs;

public static class HouseEntityConfig
{
    private const string SchemaName = "HouseSchema";

    public static ModelBuilder ConfigureHouseEntities(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<House>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(House), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            entity.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(Room), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            entity.Property(x => x.FileEntryCollectionId).IsRequired(false);
            entity.HasOne(x => x.FileEntryCollection)
                .WithMany()
                .HasForeignKey(x => x.FileEntryCollectionId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(x => x.House)
                .WithMany(x => x.Rooms)
                .HasForeignKey(x => x.HouseId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(Customer), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            entity.Property(x => x.Birthday).IsRequired(false);
            entity.Property(x => x.IssueDate).IsRequired(false);
            entity.Property(x => x.IssueDate).IsRequired(false);
            entity.Property(x => x.RentalStartTime).IsRequired(false);
            entity.Property(x => x.FileEntryCollectionId).IsRequired(false);

            entity.HasOne(x => x.FileEntryCollection)
                .WithMany()
                .HasForeignKey(x => x.FileEntryCollectionId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Room)
                .WithMany(x => x.Customers)
                .HasForeignKey(x => x.RoomId)
                .OnDelete(DeleteBehavior.Restrict);
        });


        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(Member), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            entity.Property(x => x.TemporarilyDate).IsRequired(false);
            entity.Property(x => x.DateOfBirth).IsRequired(false);

            entity.HasOne(x => x.Customer)
                .WithMany(x => x.Members)
                .HasForeignKey(x => x.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(Service), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
        });

        modelBuilder.Entity<ServiceCustomer>(entity =>
        {
            entity.HasKey(x => new
            {
                x.ServiceId,
                x.CustomerId
            });
            entity.ToTable(nameof(ServiceCustomer), SchemaName);
            entity.HasOne(x => x.Customer)
                .WithMany(x => x.Services)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.Service)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Contract>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(Contract), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");

            entity.HasOne(x => x.Customer)
                .WithMany(x => x.Contracts)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.Room)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<RoomServiceIndex>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(RoomServiceIndex), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");

            entity.HasOne(x => x.Service)
                .WithMany()
                .HasForeignKey(x => x.ServiceId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Room)
                .WithMany(x => x.RoomServiceIndices)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<RoomProcess>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(RoomProcess), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");

            entity.HasOne(x => x.Customer)
                .WithMany(x => x.RoomProcesses)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Room)
                .WithMany(x => x.RoomProcesses)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<IncurredCost>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(IncurredCost), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");

            entity.HasOne(x => x.Room)
                .WithMany(x => x.IncurredCosts)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<CalculateCharge>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(CalculateCharge), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");

            entity.HasOne(x => x.Room)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Customer)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<CalculateChargeDetail>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(CalculateChargeDetail), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");

            entity.Property(x => x.RoomServiceIndexId).IsRequired(false);
            entity.Property(x => x.IncurredcostId).IsRequired(false);

            entity.HasOne(x => x.CalculateCharge)
                .WithMany(x => x.CalculateChargeDetails)
                .HasForeignKey(x => x.CalculateChargeId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.RoomServiceIndex)
                .WithMany()
                .HasForeignKey(x => x.RoomServiceIndexId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.IncurredCost)
                .WithMany()
                .HasForeignKey(x => x.IncurredcostId)
                .OnDelete(DeleteBehavior.Restrict);
        });


        return modelBuilder;
    }
}