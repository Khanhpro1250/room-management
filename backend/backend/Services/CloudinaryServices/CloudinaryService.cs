using System.Net;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace backend.Services.CloudinaryServices;

public class CloudinaryService : ICloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<Stream> DownloadAsStreamAsync(string cloudinaryFileUrl)
    {
        var result = _cloudinary.Api.UrlImgUp.Transform(new Transformation().FetchFormat("auto"))
            .BuildUrl(cloudinaryFileUrl);

        using (var webClient = new WebClient())
        {
            var bytes = await webClient.DownloadDataTaskAsync(result);
            return new MemoryStream(bytes);
        }
    }

    public async Task<bool> DeleteFileCloudinary(List<string> listUrls)
    {
        foreach (var url in listUrls)
        {
            int lastSlashIndex = url.LastIndexOf('/');
            
            string idWithExtension = url.Substring(lastSlashIndex + 1);
            
            string publicId = $"documents/{idWithExtension.Split('.')[0]}";
            
            var deleteParams = new DeletionParams(publicId)
            {
                ResourceType = ResourceType.Raw,
            };

            DeletionResult result = await _cloudinary.DestroyAsync(deleteParams);

            if (result.Result == "ok")
            {
                Console.WriteLine($"File {publicId} deleted successfully.");
            }
            else
            {
                Console.WriteLine($"Failed to delete file {publicId}. Error: {result.Error.Message}");
            }
        }

        return false;
    }
}