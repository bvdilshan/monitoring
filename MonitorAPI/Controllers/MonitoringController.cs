using Microsoft.AspNetCore.Mvc;
using MonitorAPI.Models;
using System.Text.Json;

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

                var lastLine = System.IO.File.ReadLines(logPath).LastOrDefault();

                if (string.IsNullOrEmpty(lastLine))
                    return BadRequest("Log file is empty.");

                var options = new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                };
                
                var entry = JsonSerializer.Deserialize<LogEntry>(lastLine, options);

                return Ok(entry);
            }
            catch (JsonException ex)
            {
                return StatusCode(500, $"JSON Parsing Error: {ex.Message}. Make sure to clear your old log file.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}