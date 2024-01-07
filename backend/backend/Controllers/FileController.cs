using backend.Contanst;
using backend.Controllers.Dtos;
using backend.Services.FileServices;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/file")]
public class FileController : ControllerBase
{
    private readonly Cloudinary _cloudinary;
    private readonly IFileService _fileService;
    private readonly IWebHostEnvironment _env;

    public FileController(Cloudinary cloudinary, IFileService fileService, IWebHostEnvironment env)
    {
        _cloudinary = cloudinary;
        _fileService = fileService;
        _env = env;
    }

    [HttpPost("upload")]
    public async Task<ApiResponse<object>> UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return ApiResponse<object>.Fail("File is empty");

        try
        {
            using (var stream = file.OpenReadStream())
            {
                string fileUrl = "";
                var imgUploadResult = await _cloudinary.UploadAsync(new RawUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    PublicId = Guid.NewGuid().ToString(),
                    Folder = "documents/",
                });
                fileUrl = imgUploadResult.Url.ToString();

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
        var listUrl = new List<string>();

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

    [HttpPost("upload-multis")]
    public async Task<IActionResult> UploadFile([FromForm] List<IFormFile> files, CancellationToken cancellationToken = default)
    {
        var file = await _fileService.CreateFileCollection(files, "UploadFiles", cancellationToken);

        return Ok();
    }
    
    [HttpGet("uploadFiles/{fileName}")]
    public IActionResult GetFile(string fileName)
    {
        var filePath = Path.Combine(_env.ContentRootPath, BucketConstant.UploadFiles, fileName);

        if (System.IO.File.Exists(filePath))
        {
            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "application/octet-stream", fileName);
        }
        else
        {
            return NotFound();
        }
    }
}