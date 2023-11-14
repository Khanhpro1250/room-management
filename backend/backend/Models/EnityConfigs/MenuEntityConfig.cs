using backend.Models.Entities.Menus;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.EnityConfigs;

public static class MenuEntityConfig
{
    private const string SchemaName = "MENU";

    public static ModelBuilder ConfigureMenuEntities(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.ToTable(nameof(Menu), SchemaName);
            entity.Property(x => x.Id).HasDefaultValueSql("NEWID()");
        });
        return modelBuilder;
    }
}