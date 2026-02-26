using Microsoft.AspNetCore.Mvc;
using MonitorAPI.Models;

namespace MonitorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MonitoringController : ControllerBase
    {
        [HttpGet("stats")]
        public IActionResult GetStats()
        {
            
            string logPath = "/home/vno/monitor/monitor.log";

            try
            {
                if (!System.IO.File.Exists(logPath))
                    return NotFound("Log file not found.");

                
                var lines = System.IO.File.ReadAllLines(logPath).Reverse().Take(6).ToList();
                
                
                var entry = new LogEntry
                {
                    Timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                    RamUsage = lines.FirstOrDefault(l => l.Contains("RAM"))?.Split(':')[1].Trim() ?? "0%",
                    DiskUsage = lines.FirstOrDefault(l => l.Contains("Disk"))?.Split(':')[1].Trim() ?? "0%",
                    CpuUsage = lines.FirstOrDefault(l => l.Contains("CPU"))?.Split(':')[1].Trim() ?? "0%",
                    Status = lines.FirstOrDefault(l => l.Contains("Status"))?.Split(':')[1].Trim() ?? "Unknown"
                };

                return Ok(entry);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}