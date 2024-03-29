﻿using backend.Controllers.Dtos;
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
        var result = await _houseService.GetListHouse(Request.Query.GetPaginatedListQuery());
        return ApiResponse<PaginatedList<HouseDto>>.Ok(result);
    }

    [HttpPost("create")]
    public async Task<ApiResponse<HouseDto>> CrateAction([FromBody] CreateUpdateHouseDto houseDto)
    {
        var result = await _houseService.CreateHouse(houseDto);
        return ApiResponse<HouseDto>.Ok(result);
    }

    [HttpPut("update/{id:guid}")]
    public async Task<ApiResponse<HouseDto>> UpdateAction([FromBody] CreateUpdateHouseDto houseDto,
        [FromRoute] Guid id)
    {
        var result = await _houseService.UpdateHouse(houseDto, id);
        return ApiResponse<HouseDto>.Ok(result);
    }

    [HttpGet("combo")]
    public async Task<ApiResponse<List<ComboOptionDto>>> GetComboAction([FromQuery] bool isByCurrentUserId = false)
    {
        var result = await _houseService.GetComboHouse(isByCurrentUserId);
        return ApiResponse<List<ComboOptionDto>>.Ok(result);
    }

    [HttpDelete("delete/{id:guid}")]
    public async Task<ApiResponse> DeleteAction([FromRoute] Guid id)
    {
        await _houseService.DeleteHouse(id);
        return ApiResponse.Ok();
    }

    [HttpGet("test-export")]
    public async Task<FileStreamResult> Export([FromQuery] bool isPdf, [FromQuery] string fileName)
    {
        var document = await _exportService.ExportWord(new
            {
                FirstName = "Khanh",
                LastName = "Huynh"
            }, null,
            "https://res.cloudinary.com/khanh15032001/raw/upload/v1696238911/documents/e5f51be8-9315-4eae-94dc-62e054b8520d.docx");
        fileName = $"{fileName}.docx";
        if (isPdf)
            fileName = fileName.Replace("docx", "pdf");
        return WorkbookUtil.DocumentToFileStream(document, fileName);
    }
}