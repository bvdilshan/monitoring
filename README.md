🐧 Linux Resource Monitor

A simple and efficient Bash script to monitor system health (CPU, RAM, and Disk) automatically using Cron jobs.
🚀 Features

    Monitors: CPU, RAM, and Disk usage.

    Automation: Fully automated via Cron jobs.

    Logging: Logs system status every minute.

    Alerting: Flags high resource usage with a warning.

🛠️ Installation
Bash

# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Grant execution permission
chmod +x monitoring.sh

# Run the script
./monitoring.sh

🤖 Automation (Cron Job)

To automate monitoring, add this to your crontab -e:
Bash

* * * * * /home/vno/monitor/monitoring.sh >> /home/vno/monitor/monitor.log 2>&1

📊 Sample Log
Plaintext

RAM Usage: 68%
Disk Usage: 11%
CPU Usage: 19%
System Status: Healthy