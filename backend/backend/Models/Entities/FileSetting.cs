namespace backend.Models.Entities;

public class FileSetting
{
    public string[] AllowedExtensions { get; set; }

    public int? FileNameMaxLength { get; set; } = new int?(300);

    public string FileNameValidatePolicy { get; set; }

    public long MaxChunkSizeByte { get; set; }
}