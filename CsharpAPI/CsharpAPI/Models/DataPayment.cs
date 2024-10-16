namespace CsharpAPI.Models
{
    public class BaseDataPayment
    {
        public List<DataPayment> Data { get; set; } = new List<DataPayment>();
    }
    public class DataPayment
    {
        public string? Time { get; set; }
        public string? Price { get; set; }
        public string? Quality { get; set; }
        public string? Resolution { get; set; }
        public string? SupportDevices { get; set; }
        public string? NumberDevices { get; set; }
    }

}
