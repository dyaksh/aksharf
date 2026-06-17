#!/bin/bash
cd /home/z/my-project
echo "[$(date)] Attempting image generation..." >> /tmp/image-gen-cron.log
bash scripts/gen-single-image.sh >> /tmp/image-gen-cron.log 2>&1
