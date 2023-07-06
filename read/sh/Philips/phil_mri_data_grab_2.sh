# Get current year and month to get rmmu files
# Ex: rmmu202307*
current_year_month=$(date +%Y%m)

[ ! -d "$4" ] && mkdir $4
[ ! -d "$4/monitoring" ] && mkdir $4/monitoring
[ ! -d "$4/rmmu" ] && mkdir $4/rmmu

lftp -c "set net:timeout 10; set ftp:ssl-allow off; set net:reconnect-interval-base 5; set net:max-retries 1; open sftp://$2:$3@$1; cd /cygdrive/g/Log/; mget -e logcurrent.log -O $4; cd /cygdrive/g/Site; mget -e monitor_System* -O $4/monitoring; mget -e monitor_cryocompressor* -O $4/monitoring; mget -e monitor_magnet* -O $4/monitoring; mget -e rmmu$current_year_month* -O $4/rmmu"

