# Get current year and month to get rmmu files
# Ex: rmmu202307*
current_year_month=$(date +%Y%m)

[ ! -d "$4" ] && mkdir $4
[ ! -d "$4/monitoring" ] && mkdir $4/monitoring
[ ! -d "$4/rmmu" ] && mkdir $4/rmmu
[ ! -d "$4/rmmu_short" ] && mkdir $4/rmmu_short
[ ! -d "$4/rmmu_long" ] && mkdir $4/rmmu_long
[ ! -d "$4/rmmu_magnet" ] && mkdir $4/rmmu_magnet

lftp -c "set sftp:connect-program 'ssh -oKexAlgorithms=diffie-hellman-group14-sha1'; set net:timeout 10; set ftp:ssl-allow off; set net:reconnect-interval-base 2; set net:max-retries 1; set xfer:clobber true; open sftp://$2:$3@$1; cd /cygdrive/g/Site; mget rmmu_short_cryogenic$current_year_month* -O $4/rmmu_short; mget rmmu_long_cryogenic$current_year_month* -O $4/rmmu_long; mget rmmu_magnet$current_year_month* -O $4/rmmu_magnet; mget rmmu$current_year_month* -O $4/rmmu; mget monitor_System* -O $4/monitoring; mget monitor_cryocompressor* -O $4/monitoring; mget monitor_magnet* -O $4/monitoring; cd /cygdrive/g/Log/; mget logcurrent.log -O $4"

# This script pulls rmmu, short, long, magnet: path /cygdrive/g/Site.
# Pulls monitoring from /cygdrive/g/Site
