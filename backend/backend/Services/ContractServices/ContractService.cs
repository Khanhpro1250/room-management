using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;
using backend.Models.Entities.Contracts;
using backend.Models.Repositorties.ContractRepositories;
using backend.Utils;
using MongoDB.Driver;

namespace backend.Services.ContractServices
{
    public class ContractService : IContractService
    {
        private readonly IContractRepository _contractRepository;
        private readonly IMapper _mapper;

        public ContractService(IContractRepository contractRepository, IMapper mapper)
        {
            _contractRepository = contractRepository;
            _mapper = mapper;
        }

        public async Task<ContractDto> CreateContract(CreateUpdateContractDto contract)
        {
            var contractEntity = _mapper.Map<CreateUpdateContractDto, Contract>(contract);
            var result = await _contractRepository.CreateContract(contractEntity);
            return _mapper.Map<Contract, ContractDto>(result);
        }

        public async Task DeleteContract(string id)
        {
            await _contractRepository.DeleteContract(id);
        }


        public async Task<PaginatedList<ContractDto>> GetListContract()
        {
            var queryable = _contractRepository.GetQueryable();

            var listContract = await _contractRepository.GetListContract();
            var result = _mapper.Map<List<Contract>, List<ContractDto>>(listContract);
            foreach (var item in result)
            {
                item.IsCurrent = DatetimeExtension.IsDateInRange(DateTime.Now, item.EffectDate, item.ExpiredDate);
            }

            return new PaginatedList<ContractDto>(result, result.Count, 0, 10);
        }

        public async Task<ContractDto> GetContractById(string contractId)
        {
            var contract = await _contractRepository.GetContractById(contractId);
            var result = _mapper.Map<Contract, ContractDto>(contract);
            return result;
        }

        public async Task<ContractDto> UpdateContract(CreateUpdateContractDto contract, string id)
        {
            var contractEntity = _mapper.Map<CreateUpdateContractDto, Contract>(contract);
            var result = await _contractRepository.UpdateContract(contractEntity, id);
            return _mapper.Map<Contract, ContractDto>(result);
        }

        public async Task<ContractDto> GetCurrentContractRoomId(string roomId, string? customerId = null)
        {
            var queryable = _contractRepository.GetQueryable();
             var filterBuilder = Builders<Contract>.Filter;
             var filter = filterBuilder.And(
                    filterBuilder.Where(x=>x.RoomId.Contains(roomId)),
                    filterBuilder.WhereIf(customerId is not null , x=> x.CustomerId.Contains(customerId))
                 );
            var listContract = await queryable
                .Find(filter)
                .ToListAsync();
            var currentContract = listContract.FirstOrDefault(x =>
                DatetimeExtension.IsDateInRange(DateTime.Now, x.EffectDate, x.ExpiredDate));
            return _mapper.Map<Contract, ContractDto>(currentContract);
        }

        public async Task<bool> ValidateContract(CreateUpdateContractDto contractDto, string id = null)
        {
            var queryable = _contractRepository.GetQueryable();
            var filterBuilder = Builders<Contract>.Filter;
            var filter = filterBuilder.And(
                filterBuilder.Where(x => x.ContractNumber.Contains(contractDto.ContractNumber)),
                filterBuilder.WhereIf(id is not null, x => x.Id != id));

            var findContractNo = await queryable
                .Find(filter)
                .FirstOrDefaultAsync();

            if (findContractNo is not null) throw new Exception("Số hợp đồng đã tồn tại!");

            var listContract = await queryable.Find(x =>
                x.CustomerId.Contains(contractDto.CustomerId) && x.RoomId.Contains(contractDto.RoomId)).ToListAsync();
            var lastContract = listContract.MaxBy(x => x.ExpiredDate);

            if ( lastContract is not null && contractDto.EffectDate >= lastContract.ExpiredDate)
                throw new Exception(
                    "Ngày hiệu lực hợp đồng không được nằm trong khoản thời gian hiệu lực hợp đồng cũ!");

            return true;
        }
    }
}