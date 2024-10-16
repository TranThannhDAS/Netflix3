using System.Net.Http.Headers;
using System.Text;
using CsharpAPI.Data;
using CsharpAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using static System.Net.WebRequestMethods;

namespace CsharpAPI
{
    public class PayPalService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly MongoDbContext mongoDbContext;
        public PayPalService(IConfiguration configuration, HttpClient httpClient, MongoDbContext mongoDbContext)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            this.mongoDbContext = mongoDbContext;
        }
        public async Task<AuthorizationResponseData?> GetAccessTokenAsync()
        {
            var clientID = _configuration.GetSection("PayPal").GetSection("ClientId").Value;
            var clientSecret = _configuration.GetSection("Paypal").GetSection("ClientSecret").Value;
            //var baseUrl = configuration.GetSection("Paypal").GetSection("BaseUrl").Value;
            //_client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var byteArray = Encoding.ASCII.GetBytes($"{clientID}:{clientSecret}");
            _httpClient.DefaultRequestHeaders.Add(
                "Authorization",
                "Basic " + Convert.ToBase64String(byteArray)
            );

            List<KeyValuePair<string, string>> postData = new List<KeyValuePair<string, string>>();

            postData.Add(new KeyValuePair<string, string>("grant_type", "client_credentials"));

            HttpResponseMessage response = await _httpClient.PostAsync(
                "https://api-m.sandbox.paypal.com/v1/oauth2/token",
                new FormUrlEncodedContent(postData)
            );

            var responseAsString = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                var authorizationResponse =
                    JsonConvert.DeserializeObject<AuthorizationResponseData>(responseAsString);
                if (authorizationResponse == null)
                {
                }
                return authorizationResponse;
            }
            else
            {
                // Phản hồi không thành công, hiển thị nội dung lỗi
                Console.WriteLine("Lỗi phản hồi từ PayPal:");
                Console.WriteLine(responseAsString);
            }

            return null;
        }
        //private async Task<string> GetAccessTokenAsync()
        //{
        //    var clientId = _configuration["PayPal:ClientId"];
        //    var secret = _configuration["PayPal:ClientSecret"];
        //    var baseUrl = _configuration["PayPal:BaseUrl"];

        //    var authToken = Encoding.ASCII.GetBytes($"{clientId}:{secret}");
        //    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));

        //    var request = new HttpRequestMessage(HttpMethod.Post, $"{baseUrl}/v1/oauth2/token");
        //    request.Content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

        //    var response = await _httpClient.SendAsync(request);
        //    response.EnsureSuccessStatusCode();

        //    var json = await response.Content.ReadAsStringAsync();
        //    var token = JsonConvert.DeserializeObject<PayPalAccessTokenResponse>(json);

        //    return token.AccessToken;
        //}
        public async Task<string> CreateOrderAsync(CreateOrderDto amount)
        {
            var accessToken = await GetAccessTokenAsync();
            var baseUrl = _configuration["PayPal:BaseUrl"];

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken.access_token);

            var orderRequest = new
            {
                intent = "CAPTURE",
                purchase_units = new[]
                {
            new
            {
                amount = new
                {
                    currency_code = "USD",
                    value = amount.price
                }
            }
        },
                application_context = new
                {            
                    return_url = string.Format("http://localhost:3000/confirmPayment?email={0}&price={1}&time={2}", amount.email, amount.price,amount.time),
                    cancel_url = "http://localhost:3000"
                }
            };
            //https://localhost:7233/Payment/confirm-payment 
            var requestContent = new StringContent(JsonConvert.SerializeObject(orderRequest), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{baseUrl}/v2/checkout/orders", requestContent);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
            {
                // Log hoặc in ra lỗi từ PayPal API
                Console.WriteLine($"Error response from PayPal: {responseContent}");
                throw new Exception($"PayPal API error: {responseContent}");
            }
            var order = JsonConvert.DeserializeObject<PayPalOrderResponse>(responseContent);

            return order.Id; 
        }
        public async Task<PayPalCaptureResponse> CaptureOrderAsync(string email, string price, string time, string orderId)
        {
            //PayPalCaptureResponse captureResponse1 = new PayPalCaptureResponse();
            //await SavePaymentToDatabase(email, price, time, orderId, captureResponse1);
            PayPalCaptureResponse captureResponse = new PayPalCaptureResponse();
            var accessToken = await GetAccessTokenAsync();
            var baseUrl = _configuration["PayPal:BaseUrl"];

            // Thêm token Bearer vào header
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken.access_token);
            var captureData = new { note_to_payer = "Capture payment for order " + orderId };
            var captureJson = JsonConvert.SerializeObject(captureData);
            var requestContent = new StringContent(captureJson, Encoding.UTF8, "application/json");

            // Gửi yêu cầu tới PayPal để xác nhận thanh toán
            var response = await _httpClient.PostAsync($"{baseUrl}/v2/checkout/orders/{orderId}/capture", requestContent);

            // Đọc phản hồi từ PayPal
            var json = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                 captureResponse = JsonConvert.DeserializeObject<PayPalCaptureResponse>(json);

                if (captureResponse.Status == "COMPLETED")
                {
                    await SavePaymentToDatabase(email, price, time, orderId, captureResponse);

                    return captureResponse;
                }
                else
                {
                    return captureResponse;
                }
            }
            else
            {
                captureResponse.Status = "FALSE";
            }
            return captureResponse;
        }
        private async Task SavePaymentToDatabase(string email, string price, string time, string orderId, PayPalCaptureResponse captureResponse)
        {
            // Tìm thông tin thanh toán của người dùng theo email
            var paymentregtis = await mongoDbContext.registerMembers.FirstOrDefaultAsync(x => x.email == email);

            if (paymentregtis != null)
            {
                // Cập nhật giá tiền
                paymentregtis.Price += double.Parse(price);

                // Cập nhật thời gian đăng ký (theo giờ)
                if (double.TryParse(paymentregtis.Time, out var currentTime))
                {
                    paymentregtis.Time = (currentTime + double.Parse(time)).ToString(); 
                }
                else
                {
                    paymentregtis.Time = time; 
                }

                if (paymentregtis.ExpirationDate.HasValue && paymentregtis.ExpirationDate > DateTime.UtcNow)
                {
                    paymentregtis.ExpirationDate = paymentregtis.ExpirationDate.Value.AddHours(double.Parse(time));
                }
                else
                {
                    paymentregtis.ExpirationDate = paymentregtis.PaymentDate.Value.AddHours(double.Parse(time));
                }
            }
            else
            {
                RegisterMember registerMember = new RegisterMember
                {
                    _id = ObjectId.GenerateNewId(),
                    email = email,
                    Price = double.TryParse(price, out var parsedPrice) ? parsedPrice : throw new ArgumentException("Invalid price format"),
                    Time = time,
                    OrderId = orderId,
                    Status = captureResponse.Status,
                    PayPalTransactionId = captureResponse.Id,
                    PaymentDate = DateTime.UtcNow,  
                    ExpirationDate = DateTime.UtcNow.AddHours(double.Parse(time))
                };

                mongoDbContext.registerMembers.Add(registerMember);
            }

            // Lưu thay đổi vào cơ sở dữ liệu
            await mongoDbContext.SaveChangesAsync();
        }
        public async Task<List<RegisterMember>> GetDataRegister()
        {
            var result = await mongoDbContext.registerMembers.ToListAsync();
            return result;
        }
        public async Task<RegisterMember> GetDetail(string email)
        {
            var result = await mongoDbContext.registerMembers.FirstOrDefaultAsync(x => x.email == email)?? new RegisterMember();
            return result;
        }
    }
    public class PayPalAccessTokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
    public class PayPalOrderResponse
    {
        [JsonProperty("id")]
        public string Id { get; set; }
    }
    public class PayPalCaptureResponse
    {
        [JsonProperty("id")]
        public string Id {  get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("purchase_units")]
        public List<PurchaseUnit> PurchaseUnits { get; set; }
    }

    public class PurchaseUnit
    {
        [JsonProperty("amount")]
        public Amount Amount { get; set; }
    }

    public class Amount
    {
        [JsonProperty("value")]
        public string Value { get; set; }
    }
    public class AuthorizationResponseData
    {
        public string scope { get; set; }
        public string access_token { get; set; }
        public string token_type { get; set; }
        public string app_id { get; set; }
        public int expires_in { get; set; }
        public List<string> supported_authn_schemes { get; set; }
        public string nonce { get; set; }
        public ClientMetadata client_metadata { get; set; }
    }
    public class ClientMetadata
    {
        public string name { get; set; }
        public string display_name { get; set; }
        public string logo_uri { get; set; }
        public List<string> scopes { get; set; }
        public string ui_type { get; set; }
    }
}
