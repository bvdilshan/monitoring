#!/bin/bash

# RAM Usage
memory_usage=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
memory_usage_int=${memory_usage%.*}

# Disk Usage
disk_usage=$(df / | grep / | awk '{ print $5 }' | sed 's/%//g')

# CPU Usage
cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
cpu_usage_int=${cpu_usage%.*}

# Uptime 
server_uptime=$(uptime -p | sed 's/up //')

# Top Process 
top_process=$(ps -eo comm,%cpu --sort=-%cpu | head -n 2 | tail -n 1 | awk '{print $1}')

# Network Traffic 
net_interface=$(ls /sys/class/net | grep -E 'eth|enp|wlan' | head -n 1)
net_rx=$(cat /sys/class/net/$net_interface/statistics/rx_bytes)

# Status Check
status=$([ $memory_usage_int -lt 85 ] && echo "Healthy" || echo "Warning")

log_entry="{\"timestamp\":\"$(date '+%Y-%m-%d %H:%M:%S')\",\"ramUsage\":\"$memory_usage_int%\",\"cpuUsage\":\"$cpu_usage_int%\",\"diskUsage\":\"$disk_usage%\",\"uptime\":\"$server_uptime\",\"topProcess\":\"$top_process\",\"netTraffic\":\"$net_rx\",\"status\":\"$status\"}"

echo "$log_entry" >> /home/vno/monitor/monitor.log