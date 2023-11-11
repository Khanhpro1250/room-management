using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;

namespace backend.Services.UserServices;

public interface IUserService
{
    Task<PaginatedList<UserDto>> GetListUser();
    Task<UserDto> GetUserById(string userId);
    Task<User> GetUserByUserName(string userName);
    Task<UserDto> CreateUser(CreateUpdateUserDtos user);
    Task<UserDto> UpdateUser(CreateUpdateUserDtos user,string id);
    Task<UserDto> RegisterUser(CreateUpdateUserDtos user);

    Task DeleteUser(string id);

    Task<bool> IsValidUserRegister(CreateUpdateUserDtos userDtos);

    Task<List<ComboOptionKeyTitleDto>> GetComboUser();
}