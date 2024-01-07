namespace backend.Controllers.Dtos;

public class FileEntryDto
{
    public Guid Id { get; set; } // file entry id
    public long Length { get; set; } // file entry size
    public string Name { get; set; } //file entry name
    public string FileName { get; set; } //file entry name
    public string RootFolder { get; set; } //root folder of file
    public string FileLocation { get; set; }
    public string Url { get; set; }
    public string Extension { get; set; } // extension thì get thông qua filename 
    public DateTime? CreatedTime { get; set; } // file entry Uploaded Time
    public DateTime? UpdatedAt { get; set; }
}