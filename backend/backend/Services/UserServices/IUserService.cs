using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;

namespace backend.Services.UserServices;

public interface IUserService
{
    Task<PaginatedList<UserDto>> GetListUser();
    Task<UserDto> GetUserById(string userId);
    Task<UserDto> CreateUser(CreateUpdateUserDtos user);
    Task<UserDto> UpdateUser(CreateUpdateUserDtos user,string id);

    Task<bool> IsValidUserRegister(CreateUpdateUserDtos userDtos);

    Task<List<ComboOptionDto>> GetComboUser();
    Task DeleteMenu(string id);
}