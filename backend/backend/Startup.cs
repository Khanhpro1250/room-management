using System.Security.Claims;
using backend.Models;
using backend.Models.Entities;
using backend.Models.Entities.UserAccount;
using backend.Models.Repositorties.ContractRepositories;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.FileRepositories;
using backend.Models.Repositorties.HouseRerositories;
using backend.Models.Repositorties.MenuRepositories;
using backend.Models.Repositorties.RoomRepositories;
using backend.Models.Repositorties.ServiceRepositories;
using backend.Models.Repositorties.UserAccountRepositories;
using backend.Models.Repositorties.UserAccountRepositories.OtpRepositories;
using backend.Models.Repositorties.UserAccountRepositories.RoleRepositories;
using backend.Providers;
using backend.Services.CloudinaryServices;
using backend.Services.ContractServices;
using backend.Services.CustomerServices;
using backend.Services.DepositServices;
using backend.Services.ExportWordPdfServices;
using backend.Services.FileServices;
using backend.Services.HouseServices;
using backend.Services.MenuService;
using backend.Services.NotificationServices;
using backend.Services.RequestServices;
using backend.Services.RoleServices;
using backend.Services.RoomServices;
using backend.Services.SendMailServices;
using backend.Services.ServiceServices;
using backend.Services.UserServices;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace backend;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // app.UseHttpsRedirection();

        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseCors("AllowReactNativeApp");
        // app.UseCors("AllowReactFrontend");
        app.UseStaticFiles();

        // app.UseSpa(spa =>
        // {
        //     spa.Options.SourcePath = "wwwroot";
        //     if (env.IsDevelopment()) spa.UseProxyToSpaDevelopmentServer("http://localhost:5179");
        // });


        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapSwagger();
        });
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAutoMapper(typeof(Startup));
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddControllersWithViews();
        // Add Swagger
        services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo() { Title = "My API", Version = "v1" }); });

        //AddDbContext
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options => { options.Cookie.Name = "CookieAuth"; });


        // services.AddSingleton<IRoleRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new RoleRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<IServiceRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new ServiceRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<INotificationRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new NotificationRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<IRequestRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new RequestRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<IDepositRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new DepositRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<IContractRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new ContractRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<ICustomerRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new CustomerRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<IRoomRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new RoomRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<IUserAccountRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new UserAccountRepository(mongoClient, "room_manager");
        // });
        // services.AddSingleton<IMenuRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new MenuRepository(mongoClient, "room_manager");
        // });
        //
        // services.AddSingleton<IHouseRepository>(_ =>
        // {
        //     var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
        //     return new HouseRepository(mongoClient, "room_manager");
        // });

        services.AddTransient<IUserAccountRepository, UserAccountRepository>();
        services.AddTransient<IRoleRepository, RoleRepository>();
        services.AddTransient<IMenuRepository, MenuRepository>();
        services.AddTransient<IHouseRepository, HouseRepository>();
        services.AddTransient<IRoomRepository, RoomRepository>();
        services.AddTransient<IServiceRepository, ServiceRepository>();
        services.AddTransient<ICustomerRepository, CustomerRepository>();
        services.AddTransient<IContractRepository, ContractRepository>();
        services.AddTransient<IFileEntryRepository, FileEntryRepository>();
        services.AddTransient<IFileRepository, FileRepository>();
        services.AddTransient<IOtpRepository, OtpRepostiory>();
        services.AddTransient<IRoomServiceIndexRepository, RoomServiceIndexRepository>();
        services.AddTransient<IRoomProcessRepository, RoomProcessRepository>();


        // AddScoped adService
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IMenuService, MenuService>();
        services.AddScoped<IHouseService, HouseService>();
        services.AddScoped<IRoomService, RoomService>();
        services.AddScoped<ICustomerService, CustomerService>();
        services.AddScoped<IContractService, ContractService>();
        services.AddScoped<IDepositService, DepositService>();
        services.AddScoped<IRequestService, RequestService>();
        services.AddScoped<INotificationService, NotificationService>();
        services.AddScoped<IServiceService, ServiceService>();
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<ICloudinaryService, CloudinaryService>();
        services.AddScoped<ICurrentUser, CurrentUser>();
        services.AddScoped<IFileService, FileService>();
        services.AddScoped<IOtpService, OtpService>();
        services.AddScoped<ClaimsPrincipal>(provider => provider.GetService<IHttpContextAccessor>()?.HttpContext?.User);
        services.AddScoped<User>();
        services.AddScoped<IDbContextProvider<ApplicationDbContext>, DbContextProvider<ApplicationDbContext>>();

        services.Configure<FileSetting>(Configuration.GetSection(nameof(FileSetting)));
        services.Configure<AppFileBucketConfig>(Configuration.GetSection(nameof(AppFileBucketConfig)));


        // Add cloundinary
        Account account = new Account(
            "khanh15032001",
            "164546612591237",
            "Bn4-zcYmhmWyKF1dw1id_ziMXEs");

        Cloudinary cloudinary = new Cloudinary(account);
        services.AddSingleton(cloudinary);


        //Sendmail
        services.AddScoped<ISendMailService, SendMailService>();
        //Export word-pdf
        services.AddScoped<IExportService, ExportService>();
        services.AddCors(options =>
        {
            options.AddPolicy("AllowReactNativeApp", builder =>
            {
                // Allow requests from the React Native app's origin (e.g., http://localhost:7179)
                builder.WithOrigins()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    ;
            });
        });

        services.AddHttpContextAccessor();
    }
}