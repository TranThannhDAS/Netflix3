using CsharpAPI;
using CsharpAPI.Data;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
builder.Services.AddDbContext<MongoDbContext>(options =>
options.UseMongoDB(builder.Configuration.GetConnectionString("MongoDbConnection") ?? "mongodb+srv://youtube-netflixo:youtubenetflixo@netflixo-youtube.q7xrbnq.mongodb.net/Netflixo-youtube?retryWrites=true&w=majority&appName=netflixo-youtube", "Netflixo-youtube")
);
builder.Services.AddHttpClient();

builder.Services.AddScoped<PayPalService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
