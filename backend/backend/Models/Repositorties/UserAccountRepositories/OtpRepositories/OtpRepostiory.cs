using backend.Models.Entities.UserAccount;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repositorties.UserAccountRepositories.OtpRepositories;

public class OtpRepostiory : EfCoreRepository<ApplicationDbContext, Otp>, IOtpRepository
{
    private readonly ApplicationDbContext _context;

    public OtpRepostiory(IServiceProvider serviceProvider, ApplicationDbContext applicationDbContext) : base(
        serviceProvider, applicationDbContext)
    {
        _context = applicationDbContext;
    }

    public DbSet<Otp> GetRepository()
    {
        return _context.Set<Otp>();
    }

    public IQueryable<Otp> GetQueryable()
    {
        return GetRepository().AsQueryable();
    }
}