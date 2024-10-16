using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class RegisterMember
{
    [BsonId]
    public ObjectId _id { get; set; }
    /// <summary>
    /// email người dùng
    /// </summary>
    public string? email  { get; set; }
    public double? Price { get; set; }  
    public string? Type { get; set; }
}
