namespace AuthECAPI.Extensions;

public static class AppConfigExtensions
{
  public static void ConfigCors(this WebApplication app)
  {
    app.UseCors(options => options.WithOrigins("http://localhost:4200")
      .AllowAnyHeader()
      .AllowAnyMethod());
  }
}