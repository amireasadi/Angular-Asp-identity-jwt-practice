using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthECAPI.Controllers;
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

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

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
app.MapGroup("/api").MapIdentityUserEndpoints();
app.Run();