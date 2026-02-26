namespace MonitorAPI.Models
{
    public class LogEntry
    {
        public string Timestamp { get; set; } = "";
        public string RamUsage { get; set; } = "";
        public string DiskUsage { get; set; } = "";
        public string CpuUsage { get; set; } = "";
        public string Uptime { get; set; } = "";
        public string TopProcess { get; set; } = "";
        public string NetTraffic { get; set; } = "";
        public string Status { get; set; } = "";
    }
}