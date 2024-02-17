using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties;

public class EfCoreRepository<TDbContext, TEntity>
    where TDbContext : ApplicationDbContext
    where TEntity : class
{
    protected readonly IServiceProvider ServiceProvider;
    protected DbContext DbContext;

    public EfCoreRepository(IServiceProvider serviceProvider, DbContext dbContext)
    {
        ServiceProvider = serviceProvider;
        DbContext = dbContext;
    }

    public Task<DbSet<TEntity>> GetDbSetAsync() => Task.FromResult(DbContext.Set<TEntity>());

    public virtual async Task<TEntity> AddAsync(TEntity entity, bool autoSave = false)
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        TEntity savedEntity = (await DbContext.Set<TEntity>().AddAsync(entity))?.Entity;
        if (autoSave)
            await DbContext.SaveChangesAsync(new CancellationToken());
        TEntity entity1 = savedEntity;
        DbContext = default(TDbContext);
        savedEntity = default(TEntity);
        return entity1;
    }

    public virtual async Task<TEntity> UpdateAsync(TEntity entity, bool autoSave = false)
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        TEntity updatedEntity = DbContext.Set<TEntity>().Update(entity)?.Entity;
        if (autoSave)
            await DbContext.SaveChangesAsync(new CancellationToken());
        TEntity entity1 = updatedEntity;
        updatedEntity = default(TEntity);
        return entity1;
    }

    public virtual async Task DeleteAsync(TEntity entity, bool autoSave = false)
    {
        DbContext.Set<TEntity>().Remove(entity);
        if (!autoSave)
            return;
        await DbContext.SaveChangesAsync(new CancellationToken());
    }

    public async Task AddRangeAsync(List<TEntity> entities, bool autoSave = false)
    {
        await DbContext.Set<TEntity>().AddRangeAsync((IEnumerable<TEntity>)entities);
        if (!autoSave)
        {
            DbContext = default(TDbContext);
        }
        else
        {
            await DbContext.SaveChangesAsync(new CancellationToken());
            DbContext = default(TDbContext);
        }
    }

    public async Task UpdateRangeAsync(List<TEntity> entities, bool autoSave = false)
    {
        DbContext.Set<TEntity>().UpdateRange((IEnumerable<TEntity>)entities);
        if (!autoSave)
            return;
        await DbContext.SaveChangesAsync(new CancellationToken());
    }
}