package Services;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class PaymentServices {

    public String getDataPayment() {
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
}
