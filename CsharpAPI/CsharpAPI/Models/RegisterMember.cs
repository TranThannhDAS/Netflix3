using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

public class RegisterMember
{
    [Key]  // Đánh dấu OrderId làm khóa chính
    public ObjectId? _id { get; set; }
    /// <summary>
    /// email người dùng
    /// </summary>
    public string? email  { get; set; }
    public double? Price { get; set; }  
    public string? Time { get; set; }
    public string? OrderId { get; set; }
    public DateTime? PaymentDate { get; set; } = DateTime.UtcNow;
    public string? Status { get; set; }
    public string? PayPalTransactionId { get; set; }
    public DateTime? ExpirationDate { get; set; }

}
