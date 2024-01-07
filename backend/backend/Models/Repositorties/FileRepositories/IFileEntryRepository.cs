using backend.Models.Entities.Files;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.FileRepositories;

public interface IFileEntryRepository : IRepository<FileEntry>
{
    DbSet<FileEntry> GetRepository();
    IQueryable<FileEntry> GetQueryable();
}