using backend.Controllers.Dtos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/file")]
public class FileController : ControllerBase
{
    private readonly Cloudinary _cloudinary;

    public FileController(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    [HttpPost("upload")]
    public async Task<ApiResponse<object>> UploadFile(IFormFile file, [FromQuery] UploadType type = UploadType.Imgage)
    {
        if (file == null || file.Length == 0)
            return ApiResponse<object>.Fail("File is empty");

        try
        {
            using (var stream = file.OpenReadStream())
            {
                string fileUrl = "";
                if (type == UploadType.Imgage)
                {
                    var imgUploadResult = await _cloudinary.UploadAsync(new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        PublicId = Guid.NewGuid().ToString(), // Optional: set a unique identifier
                        Folder = "images/"
                    });
                    fileUrl = imgUploadResult.Url.ToString();
                }
                else
                {
                    var imgUploadResult = await _cloudinary.UploadAsync(new RawUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        PublicId = Guid.NewGuid().ToString(), 
                        Folder = "documents/",
                    });
                    fileUrl = imgUploadResult.Url.ToString();
                }
                
                return ApiResponse<object>.Ok(new { FileUrl = fileUrl });
            }
        }
        catch (Exception ex)
        {
            return ApiResponse<object>.Fail($"Error uploading file: {ex.Message}");
        }
    }

    [HttpPost("upload-multi")]
    public async Task<IActionResult> UploadFileMulti(List<IFormFile> files)
    {
  
        var listUrl = new  List<string>();

        foreach (var file in files)
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
                listUrl.Add(uploadResult.Url.ToString());
            }
        }

        return Ok(new { FileUrls = listUrl });
    }
    
}