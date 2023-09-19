using AutoMapper;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.CustomerDtos;
using backend.DTOs.RequestDtos;
using backend.Models.Entities.Customers;
using backend.Models.Entities.Requests;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.RequestRepositories;

namespace backend.Services.RequestServices
{
    public class RequestService : IRequestService
    {
        private readonly IRequestRepository _requestRopository;
        private readonly IMapper _mapper;

        public RequestService(IRequestRepository requestRepository, IMapper mapper)
        {
            _requestRopository = requestRepository;
            _mapper = mapper;
        }
        public async Task<RequestDto> CreateRequest(CreateUpdateRequestDto request)
        {
            var requestEntity = _mapper.Map<CreateUpdateRequestDto, Request>(request);
            var result = await _requestRopository.CreateRequest(requestEntity);
            return _mapper.Map<Request, RequestDto>(result);
        }

        public async Task DeleteRequest(string id)
        {
            await _requestRopository.DeleteRequest(id);
        }

        public async Task<PaginatedList<RequestDto>> GetListRequest()
        {
            var listRequest = await _requestRopository.GetListRequest();
            var result = _mapper.Map<List<Request>, List<RequestDto>>(listRequest);
            return new PaginatedList<RequestDto>(result, result.Count, 0, 10);
        }

        public async Task<RequestDto> GetRequestById(string requestId)
        {
            var request = await _requestRopository.GetRequestById(requestId);
            var result = _mapper.Map<Request, RequestDto>(request);
            return result;
        }

        public async Task<RequestDto> UpdateRequest(CreateUpdateRequestDto request, string id)
        {

            var requestEntity = _mapper.Map<CreateUpdateRequestDto, Request>(request);
            var result = await _requestRopository.UpdateRequest(requestEntity, id);
            return _mapper.Map<Request, RequestDto>(result);
        }
    }
}
