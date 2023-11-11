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
    public class ContractController
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
            var result = await _contractService.GetListContract();
            return ApiResponse<PaginatedList<ContractDto>>.Ok(result);
        }


        [HttpGet("detail/{id}")]
        public async Task<ApiResponse<ContractDto>> GetDetail([FromRoute] string id)
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
            [FromRoute] string id)
        {
            await _contractService.ValidateContract(contractDto, id);
            var result = await _contractService.UpdateContract(contractDto, id);
            return ApiResponse<ContractDto>.Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ApiResponse> DeleteAction([FromRoute] string id)
        {
            await _contractService.DeleteContract(id);
            return ApiResponse.Ok();
        }
        
        [HttpPost("export-contract/{roomId}")]
        public async Task<FileStreamResult> ExportAction([FromBody] CreateUpdateContractDto contractDto, string roomId)
        {
            var room = await _roomService.GetRoomById(roomId);
            var user = await _userService.GetUserById(_currentUser.Id);
            var customer = await _customerService.GetCustomerByRoomId(roomId);
            var dataReplace = new ExportContractDto()
            {
                EffectDate = contractDto.EffectDate.ToString("dd/MM/yyyy"),
                Month = contractDto.Month,
                ContractNumber = contractDto.ContractNumber,
                SignedDate = contractDto.SignedDate.ToString("dd/MM/yyyy"),
                Customer = new CustomerExportDto
                {
                    FullName = customer?.FullName,
                    DateOfBirth = customer?.Birthday.ToString("dd/MM/yyyy"),
                    IdentityNo = customer?.IdentityNo,
                    IssueDate = customer?.IssueDate.ToString("dd/MM/yyyy"),
                    PermanentAddress = customer?.PermanentAddress,
                    PhoneNumber = customer?.PhoneNumber1,
                    Deposit = MoneyConverter.ToLocaleDotString(customer?.Deposit ?? 0),
                    DepositWord = MoneyConverter.ConvertToMoneyString(customer?.Deposit ?? 0)
                },
                Room = new RoomExportDto
                {
                    Price = MoneyConverter.ToLocaleDotString(room.Price),
                    PriceWord = MoneyConverter.ConvertToMoneyString(room.Price)
                },
                User = new UserExportDto
                {
                    FullName = user.FullName ,
                    PhoneNumber = user.PhoneNumber,
                    Address = user.Address
                }

            };
            var wookbook = await _exportService.ExportWord(dataReplace,null,"https://res.cloudinary.com/khanh15032001/raw/upload/v1698657766/documents/templateContract_vl930m.docx");
            return WorkbookUtil.DocumentToFileStream(wookbook,"Hopdong123.doc");
        }
    }
}