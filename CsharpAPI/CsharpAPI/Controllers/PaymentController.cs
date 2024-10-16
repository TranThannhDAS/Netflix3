using CsharpAPI.Data;
using CsharpAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using static MongoDB.Driver.WriteConcern;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CsharpAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly MongoDbContext mongoDbContext;
        private readonly PayPalService _payPalService;

        public PaymentController(IWebHostEnvironment env, MongoDbContext mongoDbContext, PayPalService payPalService)
        {
            _env = env;
            this.mongoDbContext = mongoDbContext;
            _payPalService = payPalService;
        }
        [HttpGet]
        public async Task<IActionResult> GetDataPayment()
        {
            BaseDataPayment data = new BaseDataPayment();
            string webRootPath = _env.WebRootPath;
            string filePath = Path.Combine(webRootPath, "dataPayment.json" );
            if (System.IO.File.Exists(filePath))
            {
                string jsonString = await System.IO.File.ReadAllTextAsync(filePath);
                data = JsonSerializer.Deserialize<BaseDataPayment>(jsonString) ?? new BaseDataPayment();
            }
            return Ok(data);
        }
        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder(CreateOrderDto createOrderDto)
        {
            var orderId = await _payPalService.CreateOrderAsync(createOrderDto);

            return Ok(new { orderId });
        }
        [HttpGet("confirm-payment")]
        public async Task<IActionResult> confirmPayment(string email, string price, string time,string token, string PayerID)
        {
            var captureResponse = await _payPalService.CaptureOrderAsync(email, price, time, token);
            return Ok(captureResponse);
        }


        //[HttpPost("create-order")]
        //public async Task<IActionResult> CreateOrder(double amount)
        //{
        //    var orderId = await _payPalService.CreateOrderAsync(amount);
        //    return Ok(new { orderId });
        //}
    }
}
