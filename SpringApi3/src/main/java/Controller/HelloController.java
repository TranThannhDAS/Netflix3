package Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RestController
public class HelloController {

    @GetMapping("/Payment/GetDataPayment")
    public String callPaymentApi() {
        // Tạo một HttpClient
        HttpClient client = HttpClient.newHttpClient();

        // Tạo một HttpRequest để gửi GET request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:5227/Payment/GetDataPayment"))
                .GET()
                .build();

        try {
            // Thực hiện request và lấy response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Kiểm tra trạng thái phản hồi
            if (response.statusCode() == 200) {
                // Trả về nội dung của response nếu thành công
                return response.body();
            } else {
                // Trả về thông báo lỗi nếu không thành công
                return "Error: Received status code " + response.statusCode();
            }
        } catch (IOException | InterruptedException e) {
            // Xử lý lỗi nếu có lỗi trong quá trình gửi request
            e.printStackTrace();
            return "Error while calling API: " + e.getMessage();
        }
    }
    @GetMapping("/Payment/GetAllRegister")
    public String GetAllRegister() {
        // Tạo một HttpClient
        HttpClient client = HttpClient.newHttpClient();

        // Tạo một HttpRequest để gửi GET request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:5227/Payment/GetAllRegister"))
                .GET()
                .build();

        try {
            // Thực hiện request và lấy response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Kiểm tra trạng thái phản hồi
            if (response.statusCode() == 200) {
                // Trả về nội dung của response nếu thành công
                return response.body();
            } else {
                // Trả về thông báo lỗi nếu không thành công
                return "Error: Received status code " + response.statusCode();
            }
        } catch (IOException | InterruptedException e) {
            // Xử lý lỗi nếu có lỗi trong quá trình gửi request
            e.printStackTrace();
            return "Error while calling API: " + e.getMessage();
        }
    }
    @GetMapping("/Payment/getDetailRegister")
    public String getDetailRegister(String email) {
        // Tạo một HttpClient
        HttpClient client = HttpClient.newHttpClient();

        // Xây dựng URL động với biến email
        String url = String.format("http://localhost:5227/Payment/getDetailRegister?email=%s", email);

        // Tạo HttpRequest để gửi GET request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        try {
            // Thực hiện request và lấy response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Kiểm tra trạng thái phản hồi
            if (response.statusCode() == 200) {
                // Trả về nội dung của response nếu thành công
                return response.body();
            } else {
                // Trả về thông báo lỗi nếu không thành công
                return "Error: Received status code " + response.statusCode();
            }
        } catch (IOException | InterruptedException e) {
            // Xử lý lỗi nếu có lỗi trong quá trình gửi request
            e.printStackTrace();
            return "Error while calling API: " + e.getMessage();
        }
    }
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/Payment/CreateOrder")
    public String createOrder(@RequestBody OrderRequest orderRequest) {
        // Tạo HttpClient
        HttpClient client = HttpClient.newHttpClient();

        try {
            // Chuyển đổi OrderRequest thành JSON bằng ObjectMapper
            String requestBody = objectMapper.writeValueAsString(orderRequest);

            // Tạo HttpRequest để gửi POST request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:5227/Payment/CreateOrder"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            // Thực hiện request và lấy response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Kiểm tra trạng thái phản hồi
            if (response.statusCode() == 200) {
                // Trả về nội dung của response nếu thành công
                return response.body();
            } else {
                // Trả về thông báo lỗi nếu không thành công
                return "Error: Received status code " + response.statusCode();
            }
        } catch (IOException | InterruptedException e) {
            // Xử lý lỗi nếu có lỗi trong quá trình gửi request
            e.printStackTrace();
            return "Error while calling API: " + e.getMessage();
        }
    }
    @GetMapping("/Payment/confirm-payment")
    public String confirmPayment(
            @RequestParam String email,
            @RequestParam String price,
            @RequestParam String time,
            @RequestParam String token,
            @RequestParam String PayerID) {

        // Tạo HttpClient
        HttpClient client = HttpClient.newHttpClient();

        // Xây dựng URL động với các tham số
        String url = String.format(
                "http://localhost:5227/Payment/confirm-payment?email=%s&price=%s&time=%s&token=%s&PayerID=%s",
                email, price, time, token, PayerID);

        // Tạo HttpRequest để gửi GET request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        try {
            // Thực hiện request và lấy response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Kiểm tra trạng thái phản hồi
            if (response.statusCode() == 200) {
                // Trả về nội dung của response nếu thành công
                return response.body();
            } else {
                // Trả về thông báo lỗi nếu không thành công
                return "Error: Received status code " + response.statusCode();
            }
        } catch (IOException | InterruptedException e) {
            // Xử lý lỗi nếu có lỗi trong quá trình gửi request
            e.printStackTrace();
            return "Error while calling API: " + e.getMessage();
        }
    }

}

