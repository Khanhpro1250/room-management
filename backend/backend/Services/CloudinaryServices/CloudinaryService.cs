using System.Net;
using CloudinaryDotNet;

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
        var result =  _cloudinary.Api.UrlImgUp.Transform(new Transformation().FetchFormat("auto")).BuildUrl(cloudinaryFileUrl);

        using (var webClient = new WebClient())
        {
            var bytes = await webClient.DownloadDataTaskAsync(result);
            return new MemoryStream(bytes);
        }
    }

}