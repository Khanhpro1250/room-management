namespace backend.Models.Repositorties;

public interface IRepository<TEntity> 
{
    Task<TEntity> AddAsync(TEntity entity, bool autoSave = false);
    
    Task<TEntity> UpdateAsync(TEntity entity, bool autoSave = false);
    
    Task DeleteAsync(TEntity entity, bool autoSave = false);
    
    Task AddRangeAsync(List<TEntity> entities, bool autoSave = false);
    
    Task UpdateRangeAsync(List<TEntity> entities, bool autoSave = false);

    
}