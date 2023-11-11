namespace backend.Utils;

public static class PasswordHasher
{
    public static string HashPassword(string password)
    {
        // Generate a random salt
        string salt = "$2a$12$m/0/bO/z8.g8nDnGnLxmUeh7djlg2SIbJ28I.59F1gSIT2k.mIoxK";

        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

        return hashedPassword;
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}