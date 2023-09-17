using backend.DTOs.UserDtos;

namespace backend.Services.UserServices;

public interface IUserService
{
    Task<List<UserDto>> GetListUser();
    Task<UserDto> GetUserById(string userId);
    Task<UserDto> CreateUser(CreateUpdateUserDtos user);
    Task<UserDto> UpdateUser(CreateUpdateUserDtos user,string id);
    Task DeleteMenu(string id);
}