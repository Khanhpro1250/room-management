using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.DepositDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Deposits;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.DepositRepositories;

namespace backend.Services.DepositServices
{
    public class DepositService : IDepositService
    {
        private readonly IDepositRepository _depositRepository;
        private readonly IMapper _mapper;

        public DepositService(IDepositRepository depositRepository, IMapper mapper)
        {
            _depositRepository = depositRepository;
            _mapper = mapper;
        }
        public async Task<DepositDto> CreateDeposit(CreateUpdateDepositDto deposit)
        {
            var depositEntity = _mapper.Map<CreateUpdateDepositDto, Deposit>(deposit);
            var result = await _depositRepository.CreateDeposit(depositEntity);
            return _mapper.Map<Deposit, DepositDto>(result);
        }

        public async Task DeleteDeposit(string id)
        {
            await _depositRepository.DeleteDeposit(id);
        }

        public async Task<PaginatedList<DepositDto>> GetListDeposit()
        {
            var listDeposit = await _depositRepository.GetListDeposit();
            var result = _mapper.Map<List<Deposit>, List<DepositDto>>(listDeposit);
            return new PaginatedList<DepositDto>(result, result.Count, 0, 10);
        }

        public async Task<DepositDto> GetDepositById(string depositId)
        {
            var deposit = await _depositRepository.GetDepositById(depositId);
            var result = _mapper.Map<Deposit, DepositDto>(deposit);
            return result;
        }

        public async Task<DepositDto> UpdateDeposit(CreateUpdateDepositDto deposit, string id)
        {

            var depositEntity = _mapper.Map<CreateUpdateDepositDto, Deposit>(deposit);
            var result = await _depositRepository.UpdateDeposit(depositEntity, id);
            return _mapper.Map<Deposit, DepositDto>(result);
        }
    }
}
