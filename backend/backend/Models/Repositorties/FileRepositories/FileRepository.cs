using backend.Models.Entities.Files;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.FileRepositories;

public class FileRepository : EfCoreRepository<ApplicationDbContext, FileEntryCollection>, IFileRepository
{
    private readonly ApplicationDbContext _applicationDbContext;

    public FileRepository(IServiceProvider serviceProvider, ApplicationDbContext applicationDbContext) : base(
        serviceProvider, applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public DbSet<FileEntryCollection> GetRepository()
    {
        return _applicationDbContext.Set<FileEntryCollection>();
    }

    public IQueryable<FileEntryCollection> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}