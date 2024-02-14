using backend.Models.Entities.Files;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.FileRepositories;

public class FileEntryRepository :EfCoreRepository<ApplicationDbContext, FileEntry>, IFileEntryRepository
{
    private readonly ApplicationDbContext _dbContext;
    public FileEntryRepository(IServiceProvider serviceProvider, ApplicationDbContext dbContext) : base(serviceProvider, dbContext)
    {
        _dbContext = dbContext;
    }

    public DbSet<FileEntry> GetRepository()
    {
        return _dbContext.Set<FileEntry>();
    }

    public IQueryable<FileEntry> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}