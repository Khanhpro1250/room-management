namespace backend.Models.Entities.Files;

public class FileEntryCollection : AuditedEntity<Guid>
{
    public List<FileEntry> FileEntries { get; set; }
}