namespace MonitorAPI.Models
{
    public class LogEntry
    {
        public string Timestamp { get; set; } = "";
        public string RamUsage { get; set; } = "";
        public string DiskUsage { get; set; } = "";
        public string CpuUsage { get; set; } = "";
        public string Status { get; set; } = "";
    }
}