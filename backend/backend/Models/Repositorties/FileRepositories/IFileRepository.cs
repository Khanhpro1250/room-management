using backend.Models.Entities.Files;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.FileRepositories;

public interface IFileRepository : IRepository<FileEntryCollection>
{
    DbSet<FileEntryCollection> GetRepository();
    IQueryable<FileEntryCollection> GetQueryable();
}