using backend.Models.Entities.Customers;
using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.UserAccountRepositories.OtpRepositories;

public interface IOtpRepository : IRepository<Otp>
{
    DbSet<Otp> GetRepository();
    IQueryable<Otp> GetQueryable();
}