using Grpc.Core;

namespace IdentityService.Services;

public class AuthenticationService : Identity.IdentityBase
{
    private readonly ILogger<AuthenticationService> _logger;
    public AuthenticationService(ILogger<AuthenticationService> logger)
    {
        _logger = logger;
    }

    public override Task<LoginResponse> Login(LoginRequest request, ServerCallContext context)
    {
        _logger.LogInformation($"Login request received to: Login. Email is {request.Email}. Password is {request.Password}");

        var response = new LoginResponse
        {
            Token = "I am a token"
        };

        return Task.FromResult(response);
    }
}
