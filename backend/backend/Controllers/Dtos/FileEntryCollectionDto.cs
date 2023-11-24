namespace backend.Controllers.Dtos;

public class FileEntryCollectionDto
{
    public Guid Id { get; set; }

    public List<FileEntryDto> FileEntries { get; set; } = new();
}