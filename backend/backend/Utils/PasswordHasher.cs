namespace backend.Utils;

public static class PasswordHasher
{
    public static string HashPassword(string password)
    {
        // Generate a random salt
        string salt = BCrypt.Net.BCrypt.GenerateSalt();

        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

        return hashedPassword;
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}