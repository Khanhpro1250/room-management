using System.Linq.Expressions;
using backend.Contanst;
using backend.Models;
using backend.Models.Entities;
using backend.Models.Entities.Files;
using backend.Models.Repositorties.FileRepositories;
using backend.Providers;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace backend.Services.FileServices;

public class FileService : IFileService
{
    private readonly Cloudinary _cloudinary;
    private readonly IFileRepository _fileRepository;
    private readonly IDbContextProvider<ApplicationDbContext> _contextProvider;
    private readonly IHostEnvironment _hostEnvironment;
    private readonly IServiceProvider _serviceProvider;
    private readonly AppFileBucketConfig _appFileBucketConfig;

    public FileService(Cloudinary cloudinary, IFileRepository fileRepository, IHostEnvironment hostEnvironment,
        IDbContextProvider<ApplicationDbContext> contextProvider, IServiceProvider serviceProvider,
        IOptions<AppFileBucketConfig> appFileBucketConfig)
    {
        _cloudinary = cloudinary;
        _fileRepository = fileRepository;
        _hostEnvironment = hostEnvironment;
        _contextProvider = contextProvider;
        _serviceProvider = serviceProvider;
        _appFileBucketConfig = appFileBucketConfig.Value;
    }

    private async Task<ApplicationDbContext> GetDbContextAsync() => await this._contextProvider.GetDbContextAsync();

    public async Task<List<string>> UploadMultiFile(List<IFormFile> listFiles)
    {
        var result = new List<string>();

        foreach (var file in listFiles)
        {
            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new RawUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    PublicId = Guid.NewGuid().ToString(),
                    Folder = "documents/",
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                result.Add(uploadResult.Url.ToString());
            }
        }

        return result;
    }

    public async Task<Guid> CreateFileCollection(IEnumerable<IFormFile> fileCollections, string outputFolder,
        CancellationToken cancellationToken = default)
    {
        var fileDbContext = await _contextProvider.GetDbContextAsync();
        using (var transaction = fileDbContext.Database.BeginTransaction())
        {
            try
            {
                var listFileEntry = new List<FileEntry>();

                // var fileDbContext = await _contextProvider.GetDbContextAsync();

                foreach (var file in fileCollections)
                {
                    listFileEntry.Add(await CreateFile(file, outputFolder, cancellationToken));
                }

                // await fileDbContext.SaveChangesAsync(cancellationToken);

                var fileEntryCollection = new FileEntryCollection()
                {
                    FileEntries = listFileEntry
                };

                await fileDbContext.Set<FileEntryCollection>().AddAsync(fileEntryCollection, cancellationToken);

                await fileDbContext.SaveChangesAsync(cancellationToken);

                await transaction.CommitAsync(cancellationToken);

                return fileEntryCollection.Id;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync(cancellationToken);
                throw new Exception("File extendtion invalid!");
            }
        }
    }

    public async Task<FileEntry> CreateFile(IFormFile fileEntry, string folderName,
        CancellationToken cancellationToken = default)
    {
        var simplifiedFileName = $"{Guid.NewGuid()}_{Path.GetExtension(fileEntry.FileName)}";


        FileEntry newFile = new FileEntry()
        {
            Name = fileEntry.FileName,
            FileName = fileEntry.FileName,
            FileLocation = Path.Combine(folderName, simplifiedFileName),
            Size = fileEntry.Length,
            Url = Path.Combine(BucketConstant.ApiStaticFile, simplifiedFileName),
            RootFolder = _appFileBucketConfig.BucketName,
            UploadedTime = DateTime.Now
        };

        if (!this.ValidateFileExtension(newFile.FileName))
            throw new Exception("File name with extensions: '" + Path.GetExtension(newFile.FileName) +
                                "' is not allowed!");
        if (!this.ValidateFileNameLength(newFile.FileName))
            throw new Exception("File name is too long!");

        ApplicationDbContext context = await this.GetDbContextAsync();
        if (await context.Set<FileEntry>()
                .AnyAsync<FileEntry>((Expression<Func<FileEntry, bool>>)(x => x.FileLocation == newFile.FileLocation),
                    cancellationToken))
            throw new Exception("file is already with location!");
        await SaveFileHardAsync(newFile.FileLocation, fileEntry, cancellationToken);
        // EntityEntry<FileEntry> entityEntry = await context.Set<FileEntry>().AddAsync(newFile, cancellationToken);
        FileEntry fileEntryAsync = newFile;
        context = (ApplicationDbContext)null;
        return fileEntryAsync;
    }

    public Task RemoveFileEntry(Guid fileEntryId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    private bool ValidateFileExtension(string fileName)
    {
        IOptions<FileSetting> requiredService = this._serviceProvider.GetRequiredService<IOptions<FileSetting>>();
        if (requiredService.Value.AllowedExtensions == null)
            throw new InvalidDataException("Extension setting is not config !");
        string extension = Path.GetExtension(fileName);
        return ((IEnumerable<string>)requiredService.Value.AllowedExtensions).Any<string>() &&
               ((IEnumerable<string>)requiredService.Value.AllowedExtensions).Contains<string>(extension.ToLower());
    }

    private bool ValidateFileNameLength(string fileName)
    {
        IOptions<FileSetting> requiredService = this._serviceProvider.GetRequiredService<IOptions<FileSetting>>();
        int length = fileName.Length;
        int? fileNameMaxLength = requiredService.Value.FileNameMaxLength;
        int valueOrDefault = fileNameMaxLength.GetValueOrDefault();
        return length <= valueOrDefault & fileNameMaxLength.HasValue;
    }

    public async Task RemoveFileEntryCollection(Guid? fileEntryCollection,
        CancellationToken cancellationToken = default)
    {
        if (!fileEntryCollection.HasValue) return;
        {
            var fileDbContext = await _contextProvider.GetDbContextAsync();

            var dbSet = fileDbContext.Set<FileEntryCollection>();
            var fileCollection = await dbSet
                .Include(x => x.FileEntries)
                .FirstAsync(x => x.Id == fileEntryCollection, cancellationToken);
            await Task.FromResult(dbSet.Remove(fileCollection));
        }
    }

    private async Task SaveFileHardAsync(
        string filePath,
        IFormFile fileEntry,
        CancellationToken cancellationToken = default(CancellationToken))
    {
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await fileEntry.CopyToAsync(stream, cancellationToken);
        }
    }


    public async Task<Guid> AddAndRemoveFileEntries(Guid? fileEntryCollectionId, List<IFormFile> fileCollections,
        List<Guid> deletedFileIds, string outputFolder, CancellationToken cancellationToken)
    {
        var fileDbContext = await _contextProvider.GetDbContextAsync();
        using (var transaction =await fileDbContext.Database.BeginTransactionAsync(cancellationToken))
        {
            try
            {
                var listFileEntry = new List<FileEntry>();

                if (fileCollections != null && fileCollections.Any())
                {
                    foreach (var file in fileCollections)
                    {
                        listFileEntry.Add(await CreateFile(file, outputFolder, cancellationToken));
                    }
                }

                if (fileEntryCollectionId.HasValue)
                {
                    var fileEntryCollection = await fileDbContext.Set<FileEntryCollection>()
                        .Include(x => x.FileEntries)
                        .FirstAsync(x => x.Id == fileEntryCollectionId, cancellationToken: cancellationToken);

                    fileEntryCollection.FileEntries.AddRange(listFileEntry);
                    fileEntryCollection.FileEntries.RemoveAll(x => deletedFileIds.Contains(x.Id));

                    return fileEntryCollection.Id;
                }

                var newFileEntryCollection = new FileEntryCollection()
                {
                    FileEntries = listFileEntry,
                };
                await fileDbContext.Set<FileEntryCollection>().AddAsync(newFileEntryCollection, cancellationToken);

                await fileDbContext.SaveChangesAsync(cancellationToken);

                await transaction.CommitAsync(cancellationToken);

                return newFileEntryCollection.Id;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync(cancellationToken);
                throw new Exception(e.Message);
            }
        }
    }
}

