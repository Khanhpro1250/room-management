using System.Linq.Expressions;
using backend.Models.Entities.Files;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Models.EnityConfigs;

public static class CommonEntityConfig
{
    private const string SchemaName = "Common";

    public static ModelBuilder ConfigureCommonEntities(this ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<FileEntryCollection>(entity =>
        // {
        //     entity.HasKey(x => x.Id);
        //     entity.ToTable(nameof(FileEntryCollection), SchemaName);
        //     entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
        //     entity.HasMany(x => x.FileEntries)
        //         .WithOne()
        //         .OnDelete(DeleteBehavior.Restrict);
        // });
        //
        // modelBuilder.Entity<FileEntry>(entity =>
        // {
        //     entity.HasKey(x => x.Id);
        //     entity.ToTable(nameof(FileEntry), SchemaName);
        //     entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
        //     entity.Property(x => x.FileEntryCollectionId).IsRequired(false);
        //     entity.HasOne(x => x.FileEntryCollection)
        //         .WithMany()
        //         .HasForeignKey(x => x.Id)
        //         .OnDelete(DeleteBehavior.Cascade);
        // });

        modelBuilder.Entity<FileEntry>((Action<EntityTypeBuilder<FileEntry>>)(entity =>
        {
            entity.HasKey((Expression<Func<FileEntry, object>>)(x => (object)x.Id));
        }));
        modelBuilder.Entity<FileEntryCollection>((Action<EntityTypeBuilder<FileEntryCollection>>)(entity =>
        {
            entity
                .HasMany<FileEntry>((Expression<Func<FileEntryCollection, IEnumerable<FileEntry>>>)(x => x.FileEntries))
                .WithOne((Expression<Func<FileEntry, FileEntryCollection>>)(x => x.FileEntryCollection))
                .HasForeignKey((Expression<Func<FileEntry, object>>)(x => (object)x.FileEntryCollectionId));
        }));
        return modelBuilder;
    }
}