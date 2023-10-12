namespace backend.Services.CloudinaryServices;

public interface ICloudinaryService
{
    Task<Stream> DownloadAsStreamAsync(string cloudinaryFileUrl);
    Task<bool> DeleteFileCloudinary(List<string> ids);
}