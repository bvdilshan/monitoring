var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

//Swagger 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS Policy
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// HTTP Request Pipeline 
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReact");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();