namespace backend.DTOs.UserDtos;

public class LoginReponseDto
{
     public List<string> Rights { get; set; } = new List<string>();
     public UserDto User { get; set; }
     public string Token { get; set; }
}