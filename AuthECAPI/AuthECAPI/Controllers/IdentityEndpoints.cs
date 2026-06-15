using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthECAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AuthECAPI.Controllers;

public static class IdentityEndpoints
{
  public static IEndpointRouteBuilder MapIdentityUserEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapPost("/signup",
      [AllowAnonymous] async (UserManager<AppUser> userManager,
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

    app.MapPost("/signin",
      [AllowAnonymous] async (UserManager<AppUser> userManager,
        [FromBody] LoginModel loginModel,
        IOptions<AppSettings> AppSettings) =>
      {
        var user = await userManager.FindByEmailAsync(loginModel.Email);
        if (user != null &&
            await userManager.CheckPasswordAsync(user,
              loginModel.Password))
        {
          var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppSettings.Value.JWTSecret));
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

    return app;
  }
}