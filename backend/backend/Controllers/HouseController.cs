using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.HouseDtos;
using backend.Services.ExportWordPdfServices;
using backend.Services.HouseServices;
using backend.Services.SendMailServices;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/house")]
public class HouseController : ControllerBase
{
    private readonly IHouseService _houseService;
    private readonly ISendMailService _sendMailService;
    private readonly IExportService _exportService;
    private readonly IWebHostEnvironment _environment;

    public HouseController(IHouseService houseService, ISendMailService sendMailService, IExportService exportService,
        IWebHostEnvironment environment)
    {
        _houseService = houseService;
        _sendMailService = sendMailService;
        _exportService = exportService;
        _environment = environment;
    }

    [HttpGet("index")]
    public async Task<ApiResponse<PaginatedList<HouseDto>>> GetIndexAction()
    {
        var result = await _houseService.GetListHouse();
        return ApiResponse<PaginatedList<HouseDto>>.Ok(result);
    }

    [HttpPost("create")]
    public async Task<ApiResponse<HouseDto>> CrateAction([FromBody] CreateUpdateHouseDto houseDto)
    {
        var result = await _houseService.CreateHouse(houseDto);
        return ApiResponse<HouseDto>.Ok(result);
    }

    [HttpGet("combo")]
    public async Task<ApiResponse<List<ComboOptionDto>>> GetComboAction()
    {
        var result = await _houseService.GetComboHouse();
        return ApiResponse<List<ComboOptionDto>>.Ok(result);
    }

    // [HttpGet("test-export")]
    // public async Task<FileStreamResult> Export([FromQuery] bool isPdf, [FromQuery] string fileName)
    // {
    //     var document = await _exportService.ExportWord(new
    //     {
    //         FirstName = "Khanh",
    //         LastName = "Huynh"
    //     }, "template.docx");
    //     fileName = $"{fileName}.docx";
    //     if (isPdf)
    //         fileName = fileName.Replace("docx", "pdf");
    //     return WorkbookUtil.DocumentToFileStream(document, fileName);
    // }

    
}