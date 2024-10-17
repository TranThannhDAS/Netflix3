package Controller;

public class OrderRequest {
    private String email;
    private String price;
    private String time;

    // Constructor mặc định
    public OrderRequest() {}

    // Constructor có tham số
    public OrderRequest(String email, String price, String time) {
        this.email = email;
        this.price = price;
        this.time = time;
    }

    // Getter và Setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
