using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using UserManagement.Infrastructure.Data;
using UserManagement.Domain.Entities;
using BCrypt.Net;

namespace UserManagement.API.Extensions
{
    public static class SeedDataExtensions
    {
        public static async Task SeedAdminUserAsync(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

            await context.Database.EnsureCreatedAsync();

            var seedUser = configuration.GetSection("SeedUser");
            var username = seedUser["Username"] ?? "admin";
            var email = seedUser["Email"] ?? "admin@example.com";
            var password = seedUser["Password"] ?? "admin";
            var role = seedUser["Role"] ?? "Admin";

            if (!context.Users.Any(u => u.Username == username))
            {
                var admin = new User
                {
                    Username = username,
                    Email = email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                    Role = role,
                    BirthDate = new DateOnly(1990, 1, 1),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                context.Users.Add(admin);
                await context.SaveChangesAsync();
                Console.WriteLine($"[SEED] Usuario {username} creado exitosamente.");
            }
        }
    }
}
