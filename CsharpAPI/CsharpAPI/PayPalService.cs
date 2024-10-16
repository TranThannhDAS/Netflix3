using System.Net.Http.Headers;
using System.Text;
using CsharpAPI.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace CsharpAPI
{
    public class PayPalService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        public PayPalService(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
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
                    return_url = "https://your-website.com/confirm-payment",
                    cancel_url = "https://your-website.com/cancel-payment"
                }
            };

            var requestContent = new StringContent(JsonConvert.SerializeObject(orderRequest), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{baseUrl}/v2/checkout/orders", requestContent);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var order = JsonConvert.DeserializeObject<PayPalOrderResponse>(json);

            return order.Id; 
        }
        public async Task<PayPalCaptureResponse> CaptureOrderAsync(string orderId)
        {
            var accessToken = await GetAccessTokenAsync();
            var baseUrl = _configuration["PayPal:BaseUrl"];

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken.access_token);

            var response = await _httpClient.PostAsync($"{baseUrl}/v2/checkout/orders/{orderId}/capture", null);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            var captureResponse = JsonConvert.DeserializeObject<PayPalCaptureResponse>(json);

            return captureResponse;
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
        public string Id { get; set; }

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
