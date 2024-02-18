using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.RoomDtos;
using backend.Services.ExportWordPdfServices;
using backend.Services.RoomServices;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/room")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly ICalculateChargeService _calculateChargeService;
        private readonly IExportService _exportService;

        public RoomController(IRoomService roomService, ICalculateChargeService calculateChargeService, IExportService exportService)
        {
            _roomService = roomService;
            _calculateChargeService = calculateChargeService;
            _exportService = exportService;
        }

        [HttpPost("create")]
        public async Task<ApiResponse<RoomDto>> CreateRoom([FromForm] CreateUpdateRoomDto room)
        {
            var result = await _roomService.CreateRoom(room);
            return ApiResponse<RoomDto>.Ok(result);
        }

        [HttpGet("detail/{roomId:guid}")]
        public async Task<ApiResponse<RoomDto>> GetRoomDetail([FromRoute] Guid roomId)
        {
            var result = await _roomService.GetRoomById(roomId);
            return ApiResponse<RoomDto>.Ok(result);
        }

        [HttpGet("combo")]
        public async Task<ApiResponse<List<RoomComboOptionDto>>> GetRoomCombo([FromQuery] Guid? houseId)
        {
            var result = await _roomService.GetComboRoom(houseId);
            return ApiResponse<List<RoomComboOptionDto>>.Ok(result);
        }

        [HttpPut("update/{roomId:guid}")]
        public async Task<ApiResponse<RoomDto>> UpdateRoom([FromRoute] Guid roomId,
            [FromForm] CreateUpdateRoomDto room)
        {
            var result = await _roomService.UpdateRoom(room, roomId);
            return ApiResponse<RoomDto>.Ok(result);
        }


        [HttpDelete("delete/{id:guid}")]
        public async Task<ApiResponse<RoomDto>> DeleteRoom([FromRoute] Guid id)
        {
            await _roomService.DeleteRoom(id);
            return ApiResponse<RoomDto>.Ok();
        }

        [HttpPut("return/{id:guid}")]
        public async Task<ApiResponse<object>> UpdateServiceIndexRoom([FromRoute] Guid id)
        {
            await _roomService.ReturnRoom(id);
            return ApiResponse<object>.Ok();
        }

        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<RoomDto>>> GetListRoom([FromQuery] RoomFiterDto filterDto)
        {
            filterDto.PaginatedListQuery = Request.Query.GetPaginatedListQuery();
            var result = await _roomService.GetListRoom(filterDto);
            return ApiResponse<PaginatedList<RoomDto>>.Ok(result);
        }

        [HttpGet("get-data-with-room")]
        public async Task<ApiResponse<DataWithRoomDto>> GetDataWithRoom([FromQuery] Guid roomId)
        {
            var result = await _roomService.GetDataWithRoom(roomId);
            return ApiResponse<DataWithRoomDto>.Ok(result);
        }

        #region service-index

        [HttpGet("list-electric-service")]
        public async Task<ApiResponse<PaginatedList<RoomElectricServiceDto>>> GetElectricServices(
            [FromQuery] ElectricServiceFilterDto filterDto)
        {
            var result = await _roomService.GetElectricServiceRoom(filterDto);
            return ApiResponse<PaginatedList<RoomElectricServiceDto>>.Ok(result);
        }

        [HttpPut("service-index/update")]
        public async Task<ApiResponse<object>> UpdateServiceIndexRoom(
            [FromBody] RoomServiceIndexCreateUpdateDto updateDto)
        {
            await _roomService.UpdateServiceIndex(updateDto);
            return ApiResponse<object>.Ok();
        }

        #endregion

        #region incurred-cost

        [HttpGet("incurred-cost/index")]
        public async Task<ApiResponse<PaginatedList<IncurredCostDto>>> GetIncurredCosts(
            [FromQuery] IncurredCostFilterDto filterDto)
        {
            filterDto.PaginatedListQuery = Request.Query.GetPaginatedListQuery();
            var result = await _roomService.GetIncurredCosts(filterDto);
            return ApiResponse<PaginatedList<IncurredCostDto>>.Ok(result);
        }

        [HttpPost("incurred-cost/create")]
        public async Task<ApiResponse> CreateIncurredCost(
            [FromBody] CreateIncurredCostDto incurredCostDto)
        {
            await _roomService.CreateIncurredCost(incurredCostDto);
            return ApiResponse.Ok();
        }

        [HttpPut("incurred-cost/update/{id:guid}")]
        public async Task<ApiResponse<IncurredCostDto>> UpdateIncurredCost([FromRoute] Guid id,
            [FromBody] UpdateIncurredCostDto incurredCostDto)
        {
            incurredCostDto.Id = id;
            var result = await _roomService.UpdateIncurredCost(incurredCostDto);
            return ApiResponse<IncurredCostDto>.Ok(result);
        }

        [HttpDelete("incurred-cost/delete/{id:guid}")]
        public async Task<ApiResponse> DeleteIncurredCost([FromRoute] Guid id)
        {
            await _roomService.DeleteIncurredCost(id);
            return ApiResponse.Ok();
        }

        #endregion

        #region Calculate Charge

        [HttpGet("calculate-charge/index")]
        public async Task<ApiResponse<PaginatedList<CalculateChargeGridDto>>> GetCalculateCharges(
            [FromQuery] CalculateChargeFilterDto filterDto)
        {
            var result = await _calculateChargeService.GetListCalculateCharge(filterDto);
            return ApiResponse<PaginatedList<CalculateChargeGridDto>>.Ok(result);
        }

        [HttpPost("calculate-charge/calculate")]
        public async Task<ApiResponse> GenerateCalculateCharges(
            [FromBody] CalculateRoomRequestDto calculateRoomRequestDto)
        {
            await _calculateChargeService.CalculateChargeRooms(calculateRoomRequestDto);
            return ApiResponse.Ok();
        }

        [HttpPut("calculate-charge/update/{id:guid}")]
        public async Task<ApiResponse> UpdateCalculateCharges([FromRoute] Guid id,
            [FromBody] UpdateCalculateChargeDto calculateRoomRequestDto)
        {
            calculateRoomRequestDto.Id = id;
            await _calculateChargeService.UpdateCalculateCharge(calculateRoomRequestDto);
            return ApiResponse.Ok();
        }

        [HttpGet("calculate-charge/detail/{id:guid}")]
        public async Task<ApiResponse<CalculateChargeDto>> GetDetailCalculateCharges([FromRoute] Guid id)
        {
            var result = await _calculateChargeService.GetDetailCalculateCharge(id);
            return ApiResponse<CalculateChargeDto>.Ok(result);
        }
        
        [HttpDelete("calculate-charge/delete/{id:guid}")]
        public async Task<ApiResponse> DeleteCalculateCharges([FromRoute] Guid id)
        {
            await _calculateChargeService.DeleteCalculateCharge(id);
            return ApiResponse.Ok();
        }

        [HttpGet("calculate-charge/export/{id:guid}")]
        public async Task<FileStreamResult> ExportBillAction([FromRoute] Guid id)
        {
            var dataReplace =  await _calculateChargeService.GetDetailCalculateCharge(id);
            var wookbook = await _exportService.ExportWord(dataReplace,null,"https://res.cloudinary.com/khanh15032001/raw/upload/v1708226990/documents/fnbuqvmvhn9ql1egoc7f.docx");
            return WorkbookUtil.DocumentToFileStream(wookbook,"Hoa-don-tien-nha.pdf");
        }
        #endregion
    }
}