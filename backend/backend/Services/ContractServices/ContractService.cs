using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.ContractDtos;
using backend.DTOs.CustomerDtos;
using backend.Models.Entities.Contracts;
using backend.Models.Entities.Customers;
using backend.Models.Repositorties.ContractRepositories;
using backend.Models.Repositorties.CustomerRepositories;
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
            var queryable = _contractRepository.GetQueryable();
            var findContractNo = await queryable.Find(x => x.ContractNumber.Contains(contract.ContractNumber))
                .FirstOrDefaultAsync();
            if (findContractNo is not null) throw new Exception("Số hợp đồng đã tồn tại!");
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
            var queryable = _contractRepository.GetQueryable();
            var findContractNo = await queryable
                .Find(x => x.ContractNumber.Contains(contract.ContractNumber) && x.Id != id)
                .FirstOrDefaultAsync();
            if (findContractNo is not null) throw new Exception("Số hợp đồng đã tồn tại!");
            var contractEntity = _mapper.Map<CreateUpdateContractDto, Contract>(contract);
            var result = await _contractRepository.UpdateContract(contractEntity, id);
            return _mapper.Map<Contract, ContractDto>(result);
        }
    }
}