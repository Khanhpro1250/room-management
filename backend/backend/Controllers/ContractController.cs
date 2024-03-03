using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;
using backend.Services.ContractServices;
using backend.Services.CustomerServices;
using backend.Services.ExportWordPdfServices;
using backend.Services.RoomServices;
using backend.Services.UserServices;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/contract")]
    public class ContractController: ControllerBase
    {
        private readonly IContractService _contractService;
        private readonly IRoomService _roomService;
        private readonly IExportService _exportService;
        private readonly ICurrentUser _currentUser;
        private readonly IUserService _userService;
        private readonly ICustomerService _customerService;
        
        public ContractController(IContractService contractService, IRoomService roomService, IExportService exportService, ICurrentUser currentUser, IUserService userService, ICustomerService customerService)
        {
            _contractService = contractService;
            _roomService = roomService;
            _exportService = exportService;
            _currentUser = currentUser;
            _userService = userService;
            _customerService = customerService;
        }
        
        
        [HttpGet("index")]
        public async Task<ApiResponse<PaginatedList<ContractDto>>> GetIndex()
        {
            var result = await _contractService.GetListContract(Request.Query.GetPaginatedListQuery());
            return ApiResponse<PaginatedList<ContractDto>>.Ok(result);
        }
        
        
        [HttpGet("detail/{id}")]
        public async Task<ApiResponse<ContractDto>> GetDetail([FromRoute] Guid id)
        {
            var result = await _contractService.GetContractById(id);
            return ApiResponse<ContractDto>.Ok(result);
        }
        
        [HttpPost("create")]
        public async Task<ApiResponse<ContractDto>> CreateAction([FromBody] CreateUpdateContractDto contractDto)
        {
            await _contractService.ValidateContract(contractDto, null);
            var result = await _contractService.CreateContract(contractDto);
            return ApiResponse<ContractDto>.Ok(result);
        }
        
        [HttpPut("update/{id}")]
        public async Task<ApiResponse<ContractDto>> UpdateAction([FromBody] CreateUpdateContractDto contractDto,
            [FromRoute] Guid id)
        {
            await _contractService.ValidateContract(contractDto, id);
            var result = await _contractService.UpdateContract(contractDto, id);
            return ApiResponse<ContractDto>.Ok(result);
        }
        
        [HttpDelete("delete/{id}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] Guid id)
        {
            await _contractService.DeleteContract(id);
            return ApiResponse.Ok();
        }
        
        [HttpPost("export-contract")]
        public async Task<FileStreamResult> ExportAction([FromBody] CreateUpdateContractDto contractDto)
        {
            var dataReplace = await _contractService.GetDataExportContract(contractDto);
            var wookbook = await _exportService.ExportWord(dataReplace,null,"https://res.cloudinary.com/khanh15032001/raw/upload/v1709479161/documents/templateContract_kgsu6u.doc");
            return WorkbookUtil.DocumentToFileStream(wookbook,"Hop-dong-cho-thue-nha.docx");
        }
    }
}