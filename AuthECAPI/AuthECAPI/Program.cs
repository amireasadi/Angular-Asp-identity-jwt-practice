using System.Text;
using AuthECAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Services for Identity
builder.Services.AddIdentityApiEndpoints<AppUser>()
  .AddEntityFrameworkStores<AppDbContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
  options.Password.RequireDigit = false;
  options.Password.RequireLowercase = false;
  options.Password.RequireUppercase = false;
  options.User.RequireUniqueEmail = true;
});

builder.Services.AddDbContext<AppDbContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("DevDB")));

builder.Services.AddAuthentication(x =>
{
  x.DefaultAuthenticateScheme = 
    x.DefaultChallengeScheme = 
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(y =>
{
  y.SaveToken = false;
  y.TokenValidationParameters = new TokenValidationParameters()
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:JWTSecret"]!))
  };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors(options => options.WithOrigins("http://localhost:4200")
  .AllowAnyHeader()
  .AllowAnyMethod());
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGroup("/api")
  .MapIdentityApi<AppUser>();

#region singupPost

app.MapPost("/api/signup",
  async (
    UserManager<AppUser> userManager,
    [FromBody] UserRegistrationModel userRegistrationModel) =>
  {
    AppUser user = new()
    {
      Email = userRegistrationModel.Email,
      FullName = userRegistrationModel.FullName,
      UserName = userRegistrationModel.Email
    };
    var result = await userManager.CreateAsync(user,
      userRegistrationModel.Password);
    if (result.Succeeded)
      return Results.Ok(result);
    else
      return Results.BadRequest(result);
  });

#endregion

app.Run();

class UserRegistrationModel()
{
  public string FullName { get; set; }
  public string Password { get; set; }
  public string Email { get; set; }
}