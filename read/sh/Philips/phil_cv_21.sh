set -ue
[ ! -d "$5" ] && mkdir $5
[ ! -d "$5/$4" ] && mkdir $5/$4
lftp -c "set net:timeout 5; set ftp:ssl-allow off; set net:reconnect-interval-base 5; set net:max-retries 2; open ftp://Pks.4AA:37Dbt5.FMt@172.16.30.137; cd /SaveDevData/$4;mget Event.zip -O $5/$4"
#lftp -c "set net:timeout 5; set ftp:ssl-allow off; set net:reconnect-interval-base 5; set net:max-retries 2; open ftp://Pks.4AA:37Dbt5.FMt@10.50.8.203; cd /SaveDevData/daily_2023_06_15;get Event.zip"

## --{ WORKS
## files=$(lftp -c "open ftp://$2:$3@$1; cd SaveDevData; ls -l | grep -A 10 -n daily_2023_06_12");
# timeout 120 lftp -c "open ftp://$2:$3@$1; set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/daily_$4 $5/daily_$4"
# if [ $? -ne 0 ]; then
#     echo "Connection timed out" >&2
#     exit
# fi
RECENTFILE="$(find $5/*/* -type f -name 'Event.zip' -printf "%T+ - %p\n" | sort -n | tail -1 | awk '{print $3}')"
unzip -o "$RECENTFILE" -d $5


## --{ NOTES
## timeout 120 lftp -c "open ftp://$2:$3@$1; set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/daily_$yesterday $4/daily_$yesterday"
## timeout 120 lftp ftp://$2:$3@$1 -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/ $4"

# lftp -c "open ftp://$2:$3@$1; cd /C/Program\ Files/GE\ Medical\ Systems/DL/Log/; mget -e sysError.log -O $4/sysError"
# lftp -c "open ftp://$2:$3@$1; cd  /SaveDevData/; get daily_2023_06_15"

# lftp ftp://Pks.4AA:37Dbt5.FMt@172.16.30.137

# find . -type d -mtime 0
# find . -type d -newermt "$(date '+%m-%d-%Y')"
# find /SaveDevData -type d -newermt

# grep -A 10 -n daily_2023_06_12