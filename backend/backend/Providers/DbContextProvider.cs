using Microsoft.EntityFrameworkCore;

namespace backend.Providers;

public class DbContextProvider<TDbContext> : IDbContextProvider<
#nullable disable
    TDbContext> where TDbContext : DbContext
{
    private readonly IServiceProvider _serviceProvider;
    public DbContextProvider(IServiceProvider serviceProvider) => this._serviceProvider = serviceProvider;

    public Task<TDbContext> GetDbContextAsync() =>
        Task.FromResult<TDbContext>(this._serviceProvider.GetRequiredService<TDbContext>());
}