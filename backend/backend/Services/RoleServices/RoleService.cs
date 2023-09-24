using AutoMapper;
using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.UserAccountRepositories.RoleRepositories;
using MongoDB.Driver;

namespace backend.Services.RoleServices
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRopository;
        private readonly IMapper _mapper;

        public RoleService(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRopository = roleRepository;
            _mapper = mapper;
        }
        public async Task<RoleDto> CreateRole(CreateUpdateRoleDto role)
        {
            var roleEntity = _mapper.Map<CreateUpdateRoleDto, Role>(role);
            var result = await _roleRopository.CreateRole(roleEntity);
            return _mapper.Map<Role, RoleDto>(result);
        }

        public async Task DeleteRole(string id)
        {
            await _roleRopository.DeleteRole(id);
        }

        public async Task<PaginatedList<RoleDto>> GetListRole()
        {
            var listRole = await _roleRopository.GetListRole();
            var result = _mapper.Map<List<Role>, List<RoleDto>>(listRole);
            return new PaginatedList<RoleDto>(result, result.Count, 0, 10);
        }

        public async Task<RoleDto> GetRoleById(string roleId)
        {
            var role = await _roleRopository.GetRoleById(roleId);
            var result = _mapper.Map<Role, RoleDto>(role);
            return result;
        }

        public async Task<RoleDto> UpdateRole(CreateUpdateRoleDto role, string id)
        {

            var roleEntity = _mapper.Map<CreateUpdateRoleDto, Role>(role);
            var result = await _roleRopository.UpdateRole(roleEntity, id);
            return _mapper.Map<Role, RoleDto>(result);
        }
        
        public async Task<List<ComboOptionDto>> GetComboRole()
        {
            var queryable = _roleRopository.GetQueryable();
            var roles = await queryable.Find(x => true).ToListAsync();
            var result = roles.Select(x=> new ComboOptionDto()
                {
                    
                    Value = x.Id,
                    Label = x.Name
                })
                .ToList();
                
            return result;

        }

    }
}
