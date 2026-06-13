using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthECAPI.Extensions;
using AuthECAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services
  .InjectDbContext(builder.Configuration)
  .AddIdentityHandlersAndStores()
  .ConfigureIdentityOptions()
  .AddIdentityAuth(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}

app.UseHttpsRedirection();
app.ConfigCors();
app.AddIdentityAuthMiddlewares();
app.MapControllers();
app.MapGroup("/api")
  .MapIdentityApi<AppUser>();


app.MapPost("/api/signup",
  async (UserManager<AppUser> userManager,
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


app.MapPost("/api/signin",
  async (UserManager<AppUser> userManager,
    [FromBody] LoginModel loginModel) =>
  {
    var user = await userManager.FindByEmailAsync(loginModel.Email);
    if (user != null &&
        await userManager.CheckPasswordAsync(user,
          loginModel.Password))
    {
      var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:JWTSecret"]!));
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
          new Claim("UserId",
            user.Id.ToString())
        }),
        Expires = DateTime.UtcNow.AddMinutes(10),
        SigningCredentials = new SigningCredentials(
          signInKey,
          SecurityAlgorithms.HmacSha256Signature
        )
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var securityToken = tokenHandler.CreateToken(tokenDescriptor);
      var token = tokenHandler.WriteToken(securityToken);
      return Results.Ok(new
      {
        token
      });
    }
    else
    {
      return Results.BadRequest(new
      {
        message = "Username or password is incorrect."
      });
    }
  });

app.Run();

class UserRegistrationModel()
{
  public string FullName { get; set; }
  public string Password { get; set; }
  public string Email { get; set; }
}

class LoginModel()
{
  public string Email { get; set; }
  public string Password { get; set; }
}