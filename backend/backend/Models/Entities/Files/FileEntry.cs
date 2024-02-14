namespace backend.Models.Entities.Files;

public class FileEntry : Entity
{
    public string RootFolder { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public long Size { get; set; }

    public DateTime UploadedTime { get; set; }

    public string FileName { get; set; }

    public string FileLocation { get; set; }

    public string Url { get; set; }

    public FileEntryCollection FileEntryCollection { get; set; }

    public Guid? FileEntryCollectionId { get; set; }
}