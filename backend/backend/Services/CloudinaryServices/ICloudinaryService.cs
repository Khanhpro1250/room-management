namespace backend.Services.CloudinaryServices;

public interface ICloudinaryService
{
    Task<Stream> DownloadAsStreamAsync(string cloudinaryFileUrl);
}