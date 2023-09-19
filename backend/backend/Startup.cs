using System.Text;
using backend.Models.Repositorties.ContractRepositories;
using backend.Models.Repositorties.CustomerRepositories;
using backend.Models.Repositorties.DepositRepositories;
using backend.Models.Repositorties.HouseRerositories;
using backend.Models.Repositorties.MenuRepositories;
using backend.Models.Repositorties.NotificationRepositories;
using backend.Models.Repositorties.RequestRepositories;
using backend.Models.Repositorties.RoomRepositories;
using backend.Models.Repositorties.ServiceRepositories;
using backend.Models.Repositorties.UserAccountRepositories;
using backend.Models.Repositorties.UserAccountRepositories.RoleRepositories;
using backend.Services.ContractServices;
using backend.Services.CustomerServices;
using backend.Services.DepositServices;
using backend.Services.HouseServices;
using backend.Services.MenuService;
using backend.Services.NotificationServices;
using backend.Services.RequestServices;
using backend.Services.RoleServices;
using backend.Services.RoomServices;
using backend.Services.ServiceServices;
using backend.Services.UserServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;

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

        app.UseAuthorization();
        
        app.UseCors();
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

        // Add CORS
        services.AddCors();
        // options =>
        // {
        //     options.AddPolicy("AllowReactFrontend",
        //         builder =>
        //         {
        //             builder
        //                 .WithOrigins("http://localhost:3000") // Adjust this to match your React app's address
        //                 .AllowAnyHeader()
        //                 .AllowAnyMethod();
        //         });
        // }

        // AddDbContext
        // services.AddDbContext<ApplicationDbContext>(options =>
        //     options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        // AddIdentity
        // services.AddIdentity<User, IdentityUser>()
        //    .AddEntityFrameworkStores<ApplicationDbContext>()
        //    .AddDefaultTokenProviders();
        services.AddSingleton<IRoleRepository>(_ =>
        {
            var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
            return new RoleRepository(mongoClient, "room_manager");
        });
        services.AddSingleton<IServiceRepository>(_ =>
        {
            var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
            return new ServiceRepository(mongoClient, "room_manager");
        });
        services.AddSingleton<INotificationRepository>(_ =>
        {
            var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
            return new NotificationRepository(mongoClient, "room_manager");
        });
        services.AddSingleton<IRequestRepository>(_ =>
        {
            var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
            return new RequestRepository(mongoClient, "room_manager");
        });
        services.AddSingleton<IDepositRepository>(_ =>
        {
            var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
            return new DepositRepository(mongoClient, "room_manager");
        });
        services.AddSingleton<IContractRepository>(_ =>
        {
            var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
            return new ContractRepository(mongoClient, "room_manager");
        });
        services.AddSingleton<ICustomerRepository>(_ =>
        {
            var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
            return new CustomerRepository(mongoClient, "room_manager");
        });
        services.AddSingleton<IRoomRepository>(_ =>
        {
            var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
            return new RoomRepository(mongoClient, "room_manager");
        });
        services.AddSingleton<IUserAccountRepository>(_ =>
         {
             var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
             return new UserAccountRepository(mongoClient, "room_manager");
         });
         services.AddSingleton<IMenuRepository>(_ =>
         {
             var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
             return new MenuRepository(mongoClient, "room_manager");
         });
         
         services.AddSingleton<IHouseRepository>(_ =>
         {
             var mongoClient = new MongoClient(Configuration.GetConnectionString("MongoDBConnection"));
             return new HouseRepository(mongoClient, "room_manager");
         });
         // AddAuthentication
         services.AddAuthentication(options =>
         {
             options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
             options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
         })
        .AddJwtBearer(options =>
         {
             options.RequireHttpsMetadata = false;
             options.SaveToken = true;
             options.TokenValidationParameters = new TokenValidationParameters
             {
                 ValidateIssuerSigningKey = true,
                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Jwt:Key"])),
                 ValidateIssuer = false, 
                 ValidateAudience = false
             };
         });

        // AddAuthorization
        services.AddAuthorization(options => { options.AddPolicy("Admin", policy => policy.RequireRole("Admin")); });

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
    }
}