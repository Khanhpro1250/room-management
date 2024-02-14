using backend.Models.EnityConfigs;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IServiceProvider serviceProvider)
        : base(options)
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ConfigureUserEntities();
        modelBuilder.ConfigureMenuEntities();
        modelBuilder.ConfigureHouseEntities();
        modelBuilder.ConfigureCommonEntities();
    }
}