#!/bin/bash

# BOMB SCRIPT FOR UNDEFINED VAR OR ERR DURING EXECUTION
set -ue
[ ! -d "$5" ] && mkdir $5
[ ! -d "$5/$4" ] && mkdir $5/$4
lftp -c "set net:timeout 5; set ftp:ssl-allow off; set net:reconnect-interval-base 5; set net:max-retries 2; open ftp://$2:$3@$1; 
cd /SaveDevData/$4; 
mget Event.zip -O $5/$4"

RECENTFILE="$(find $5/*/* -type f -name 'Event.zip' -printf "%T+ - %p\n" | sort -n | tail -1 | awk '{print $3}')"
unzip -o "$RECENTFILE" -d $5

## --{ WORKS
## files=$(lftp -c "open ftp://$2:$3@$1; cd SaveDevData; ls -l | grep -A 10 -n daily_2023_06_12");
# timeout 120 lftp -c "open ftp://$2:$3@$1; set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/daily_$4 $5/daily_$4"
# if [ $? -ne 0 ]; then
#     echo "Connection timed out" >&2
#     exit
# fi
