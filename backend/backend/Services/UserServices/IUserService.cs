using backend.Controllers.Dtos;
using backend.Controllers.Dtos.Responese;
using backend.DTOs.UserDtos;
using backend.Models.Entities.UserAccount;

namespace backend.Services.UserServices;

public interface IUserService
{
    Task<PaginatedList<UserDto>> GetListUser(PaginatedListQuery paginatedListQuery);
    Task<UserDto> GetUserById(Guid userId);
    Task<User> GetUserByUserNameOrEmail(string userName);
    Task<UserDto> CreateUser(CreateUpdateUserDtos user);
    Task<UserDto> UpdateUser(CreateUpdateUserDtos user, Guid userId);
    Task UpdateUserProfile(UpdateUserProfileDto user);
    Task<UserDto> RegisterUser(CreateUpdateUserDtos user);
    Task ChangePassWord(ChangePasswordDto request);

    Task DeleteUser(Guid userId);

    Task<bool> IsValidUserRegister(CreateUpdateUserDtos userDtos);

    Task<bool> IsEmailRegister(string email);

    Task<List<ComboOptionKeyTitleDto>> GetComboUser();
}