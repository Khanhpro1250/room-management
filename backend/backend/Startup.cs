using System.Text;
using backend.Models.Repositorties.MenuRepositories;
using backend.Models.Repositorties.UserAccountRepositories;
using backend.Services.IMenuService;
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

        app.UseHttpsRedirection();

        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();
        
        app.UseCors();
        app.UseStaticFiles();
        
        app.UseSpa(spa =>
        {
            spa.Options.SourcePath = "wwwroot";
            // if (env.IsDevelopment()) spa.UseProxyToSpaDevelopmentServer("http://localhost:7179");
        });


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
        

        // AddDbContext
         // services.AddDbContext<ApplicationDbContext>(options =>
         //     options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        
         // AddIdentity
         // services.AddIdentity<User, IdentityUser>()
         //    .AddEntityFrameworkStores<ApplicationDbContext>()
         //    .AddDefaultTokenProviders();
         
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

        // AddScoped
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IMenuService, MenuService>();

        services.AddReverseProxy();
    }
}