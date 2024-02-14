namespace backend.Providers;

public interface IDbContextProvider<TDbContext>
{
    Task<TDbContext> GetDbContextAsync();
}