using backend.Models.Entities.Files;

namespace backend.Services.FileServices;

public interface IFileService
{
    Task<List<string>> UploadMultiFile(List<IFormFile> listFiles);

    public Task<Guid> CreateFileCollection(IEnumerable<IFormFile> fileCollections, string outputFolder,
        CancellationToken cancellationToken = default);

    public Task<FileEntry> CreateFile(IFormFile fileEntry, string folderName,
        CancellationToken cancellationToken = default);

    public Task RemoveFileEntryCollection(Guid? fileEntryCollection, CancellationToken cancellationToken = default);

    public Task RemoveFileEntry(Guid fileEntryId, CancellationToken cancellationToken = default);

    public Task<Guid> AddAndRemoveFileEntries(Guid? fileEntryCollectionId, List<IFormFile> fileCollections,
        List<Guid> deletedFileIds, string outputFolder, CancellationToken cancellationToken = default);
}