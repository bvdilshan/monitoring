#!/bin/bash

#  Gather system data
memory_usage=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
memory_usage_int=${memory_usage%.*}

disk_usage=$(df / | grep / | awk '{ print $5 }' | sed 's/%//g')

cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
cpu_usage_int=${cpu_usage%.*}

#  Display results
echo "--- System Report ($(date)) ---"
echo "RAM Usage: $memory_usage_int%"
echo "Disk Usage: $disk_usage%"
echo "CPU Usage: $cpu_usage_int%"

#  Check system status
if [ $memory_usage_int -gt 80 ] || [ $disk_usage -gt 90 ] || [ $cpu_usage_int -gt 80 ]; then
    echo "ALERT: System resources are high!"
else
    echo "System Status: Healthy"
fi
