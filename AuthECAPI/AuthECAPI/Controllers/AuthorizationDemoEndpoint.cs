using Microsoft.AspNetCore.Authorization;

namespace AuthECAPI.Controllers;

public static class AuthorizationDemoEndpoint
{
  public static IEndpointRouteBuilder MapAuthorizationDemoEndpoint(this IEndpointRouteBuilder app)
  {
    app.MapGet("/AdminOnly", AdminOnly);
    app.MapGet("/AdminOrTeacher", [Authorize(Roles = "Admin, Teacher")]() => "Admin or teacher");
    app.MapGet("/LibraryMemberOnly", [Authorize(Policy = "HasLibraryId")]() => "Library members only");
    app.MapGet("/ApplyForMaternityLeave", [Authorize(Roles = "Teacher",Policy = "FemalesOnly")]() => "Apply for maternity leave");
    app.MapGet("/Under10AndFemale", [Authorize(Policy = "Under10")][Authorize(Policy = "FemalesOnly")]() => "Under 10 only");
    return app;
  }

  [Authorize(Roles = "Admin")]
  private static string AdminOnly()
  {
    return "Admin only";
  }
}