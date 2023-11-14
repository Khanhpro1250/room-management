namespace backend.Models.Repositorties;

public interface IRepository<TEntity> 
{
    Task<TEntity> AddAsync(TEntity entity, bool autoSave = false);
    
    Task<TEntity> UpdateAsync(TEntity entity, bool autoSave = false);
    
    Task DeleteAsync(TEntity entity, bool autoSave = false);

    
}