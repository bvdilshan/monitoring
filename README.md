# 🐧 Linux Resource Monitor

<img width="1821" height="951" alt="Image" src="https://github.com/user-attachments/assets/16399f90-d5dd-4d89-b2fc-2b38a10f1c01" />

A simple and efficient system monitoring tool (Bash + .NET + React) to track system health automatically.
🚀 Features

    Live Monitoring: CPU, RAM, and Disk usage.

    New Metrics: Real-time Uptime and Top Resource-Consuming Process.

    Pro Logging: Saves data in JSON format for easy integration.

    Full Stack: Includes a .NET API and a React Dashboard to see stats visually.

    Automation: Fully automated via Cron jobs.

🛠️ Installation
Bash

# Clone the repository
git clone https://github.com/bvdilshan/monitoring.git
cd monitoring

# Grant execution permission
chmod +x monitoring.sh

# Run the script
./monitoring.sh

🤖 Automation (Cron Job)

To automate monitoring every minute, add this to your crontab -e:
Bash

* * * * * /bin/bash /home/vno/monitor/monitoring.sh

📊 Sample JSON Log
JSON

{
  "timestamp": "2026-02-26 16:05:55",
  "ramUsage": "74%",
  "cpuUsage": "3%",
  "diskUsage": "11%",
  "uptime": "5 hours, 49 minutes",
  "topProcess": "firefox",
  "status": "Healthy"
}

💻 Tech Stack

    Script: Bash

    Backend: .NET 9 API

    Frontend: React + Tailwind CSS v4