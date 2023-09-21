using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.HouseDtos;
using backend.Services.HouseServices;
using backend.Services.SendMailServices;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/house")]
public class HouseController : ControllerBase
{
    private readonly IHouseService _houseService;
    private readonly ISendMailService _sendMailService;

    public HouseController(IHouseService houseService, ISendMailService sendMailService)
    {
        _houseService = houseService;
        _sendMailService = sendMailService;
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

    [HttpGet("test-send-mail")]
    public async Task SendMail([FromRoute]string mail ,[FromBody] string body ="")
    {
        string htmlContent = @"<!doctype html>
<html xmlns=""http://www.w3.org/1999/xhtml"" xmlns:v=""urn:schemas-microsoft-com:vml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">
<head>
    <title> </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv=""X-UA-Compatible"" content=""IE=edge"">
    <!--<![endif]-->
    <meta http-equiv=""Content-Type"" content=""text/html; charset=UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1"">
    <style type=""text/css"">
        #outlook a { padding:0; }
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }
    </style>
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type=""text/css"">
        .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
    <!--[if !mso]><!-->
    <link href=""https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"" rel=""stylesheet"" type=""text/css"">
    <style type=""text/css"">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    </style>
    <!--<![endif]-->
    <style type=""text/css"">
    </style>
</head>
<body style=""background-color:#ffffff;"">
    <div class=""mjml-body"" style=""background-color:#ffffff;"" >
        <div style=""font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:normal;text-align:left;color:#000000;"" ><table class=""section"" style=""width: 100%; margin: 16px 20px"" border=""0"" cellspacing=""0"" cellpadding=""0""> <tbody> <tr> <td> <table style=""padding: 0;"" border=""0"" width=""100%"" cellspacing=""0"" cellpadding=""0""> <tbody> <tr> <td class=""header"" style=""font-family: 'times new roman', times, serif; font-size: 24pt; color: #000000; text-align: center;""> THƯ MỜI HỌP </td> </tr> <tr> <td style=""font-size: 12pt; vertical-align: middle; line-height: 22px;"" height=""10px"">&nbsp; </td> </tr> </tbody> </table> </td> </tr> <tr> <td style=""font-family: 'times new roman', times, serif; color: #000000; font-size: 12pt""> Kính gửi Anh/ Chị, </td> </tr> <tr> <td style=""font-family: 'times new roman', times, serif; color: #000000; font-size: 12pt""> Kính mời quý Anh/ Chị tham gia dự họp với thông tin chi tiết như sau: </td> </tr> <tr> <td> <table style=""padding: 0;"" border=""0"" width=""100%"" cellspacing=""0"" cellpadding=""0""> <tbody> <tr style=""height: 17px""> <td style=""width: 18.7848%; height: 17px; min-width: 130px""> <p style=""margin: 5px 0; color: #236fa1""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Đăng ký bởi:&nbsp;</span> </p> </td> <td style=""width: 1.32013%; height: 17px"">&nbsp; </td> <td style=""width: 79.6617%; height: 17px""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Đào Xuân Kiên (TT Kinh Doanh BU01.HN)</span> </td> <td style=""width: 1.22385%; height: 17px""> <div>&nbsp; </div> </td> </tr> <tr style=""height: 17px""> <td style=""width: 18.7848%; height: 17px; min-width: 130px""> <p style=""margin: 5px 0; color: #236fa1""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Chủ đề:&nbsp;</span> </p> </td> <td style=""width: 1.32013%; height: 17px"">&nbsp; </td> <td style=""width: 79.6617%; height: 17px""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Thông tin cán bộ tham gia</span> </td> <td style=""width: 1.22385%; height: 17px""> <div>&nbsp; </div> </td> </tr> <tr style=""height: 17px""> <td style=""width: 18.7848%; height: 17px; min-width: 130px""> <p style=""margin: 5px 0; color: #236fa1""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Nội dung:&nbsp;</span> </p> </td> <td style=""width: 1.32013%; height: 17px"">&nbsp; </td> <td style=""width: 79.6617%; height: 17px""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Thông tin cán bộ tham gia</span> </td> <td style=""width: 1.22385%; height: 17px""> <div>&nbsp; </div> </td> </tr> <tr style=""height: 17px""> <td style=""width: 18.7848%; height: 17px; min-width: 130px""> <p style=""margin: 5px 0; color: #236fa1""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Ngày họp:&nbsp;</span> </p> </td> <td style=""width: 1.32013%; height: 17px"">&nbsp; </td> <td style=""width: 79.6617%; height: 17px""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">20/07/2023, 17:30 - 17:45</span> </td> <td style=""width: 1.22385%; height: 17px""> <div>&nbsp; </div> </td> </tr> <tr style=""height: 17px""> <td style=""width: 18.7848%; vertical-align: top; height: 37px; min-width: 130px""> <p style=""margin: 5px 0; color: #236fa1""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Địa điểm:&nbsp;</span> </p> </td> <td style=""width: 1.32013%; height: 37px""> <div>&nbsp; </div> </td> <td style=""width: 79.6617%; height: 37px""> <div> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Phòng họp Hoa Mai (TP. Hồ Chí Minh)</span> </div> </td> <td style=""width: 1.22385%; height: 37px""> <div>&nbsp; </div> </td> </tr> <tr style=""height: 17px""> <td style=""width: 18.7848%; height: 17px; vertical-align: top; min-width: 130px""> <p style=""margin: 5px 0; color: #236fa1""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Người tham dự:&nbsp;</span> </p> </td> <td style=""width: 1.32013%; height: 17px"">&nbsp; </td> <td style=""width: 79.6617%; height: 17px""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Trần Thị Phương Anh (Phòng Marketing)<br>Nguyễn Lương Anh Đức (TT Kinh Doanh BU03.HCM)<br>Ngô Thị Thanh Thủy (TT Kinh Doanh BU05.HN)</span> <br> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt""></span> </td> <td style=""width: 1.22385%; height: 17px""> <div>&nbsp; </div> </td> </tr> <tr style=""height: 17px""> <td style=""width: 18.7848%; height: 17px; min-width: 130px""> <p style=""margin: 5px 0; color: #236fa1""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt"">Link tài liệu (nếu có):&nbsp;</span> </p> </td> <td style=""width: 1.32013%; height: 17px""> <div>&nbsp; </div> </td> <td style=""width: 79.6617%; height: 17px""> <span style=""color: #000000; font-family: 'times new roman', times, serif; font-size: 12pt""></span> </td> <td style=""width: 1.22385%; height: 17px""> <div>&nbsp; </div> </td> </tr> </tbody> </table> </td> </tr> <tr> <td> <table> <tbody> <tr> <td style=""font-family: 'times new roman', times, serif; color: #000000; font-size: 12pt""> Đề nghị các Anh/ Chị tham dự đúng giờ và đầy đủ. </td> </tr> <tr> <td style=""font-family: 'times new roman', times, serif; color: #000000; font-size: 12pt""> Trân trọng. </td> </tr> <tr> <td class=""note"" style=""font-family: 'times new roman', times, serif; color: #000000; font-size: 12pt""> <div style=""margin-top: 8px; padding-top: 5px;""> <span class=""note-span"" style=""font-weight: 600; text-decoration: underline;"">Lưu ý:</span> <em> Email này được gửi tự động từ hệ thống Quản Lý Thông tin nội bộ Việt Nét. Vui lòng không phản hồi lại vào địa chỉ email này!</em> </div> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></div> </div>
</body>
</html>";


        await _sendMailService.SendMail(mail ?? "khanhpro1250@gmail.com", "TEST send mail",body ?? htmlContent);
    }
}