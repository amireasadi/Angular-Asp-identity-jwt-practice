using System.Security.Claims;
using AuthECAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace AuthECAPI.Controllers;

public static class AccountEndpoints
{

  public static IEndpointRouteBuilder MapAccountEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapGet("/UserProfile", [Authorize] async (ClaimsPrincipal user, UserManager<AppUser> userManger) =>
    {
      string userId = user.Claims.First(x => x.Type == "UserId").Value;
      var userDetails = await userManger.FindByIdAsync(userId);
      return Results.Ok(new AppUser()
      {
        FullName = userDetails?.FullName,
        Email = userDetails?.Email,
      });
    });
    return app;
  }
}