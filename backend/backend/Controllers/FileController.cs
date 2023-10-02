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
    public async Task<IActionResult> UploadFile(IFormFile file, [FromQuery] string type)
    {
        if (file == null || file.Length == 0)
            return BadRequest("File is empty");

        try
        {
            using (var stream = file.OpenReadStream())
            {
                string fileUrl = "";
                if (type == "img")
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
                
                return Ok(new { FileUrl = fileUrl });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error uploading file: {ex.Message}");
        }
    }
}