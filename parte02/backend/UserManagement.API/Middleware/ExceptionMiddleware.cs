using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using FluentValidation;

namespace UserManagement.API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                
                var statusCode = HttpStatusCode.InternalServerError;
                object response;

                if (ex is ValidationException validationEx)
                {
                    statusCode = HttpStatusCode.BadRequest;
                    var errors = validationEx.Errors
                        .Select(e => new { Property = e.PropertyName, Error = e.ErrorMessage })
                        .ToList();
                        
                    response = new 
                    { 
                        context.Response.StatusCode, 
                        Message = "Errores de validación", 
                        Errors = errors 
                    };
                }
                else
                {
                    if (_env.IsDevelopment())
                    {
                        response = new 
                        { 
                            context.Response.StatusCode, 
                            ex.Message, 
                            StackTrace = ex.StackTrace?.ToString() 
                        };
                    }
                    else
                    {
                        response = new 
                        { 
                            context.Response.StatusCode, 
                            Message = "Error interno del servidor" 
                        };
                    }
                }

                context.Response.StatusCode = (int)statusCode;
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
