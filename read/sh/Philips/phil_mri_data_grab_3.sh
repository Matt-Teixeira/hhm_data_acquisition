# Get current year and month to get rmmu files
# Ex: rmmu202307*
current_year_month=$(date +%Y%m)

[ ! -d "$4" ] && mkdir $4
[ ! -d "$4/monitoring" ] && mkdir $4/monitoring
[ ! -d "$4/rmmu_short" ] && mkdir $4/rmmu_short
[ ! -d "$4/rmmu_long" ] && mkdir $4/rmmu_long
[ ! -d "$4/rmmu_magnet" ] && mkdir $4/rmmu_magnet

lftp -c "set sftp:connect-program 'ssh -oKexAlgorithms=diffie-hellman-group14-sha1'; set net:timeout 10; set ftp:ssl-allow off; set net:reconnect-interval-base 2; set net:max-retries 1; set xfer:clobber true; open sftp://$2:$3@$1; cd /cygdrive/g/Log/; mget logcurrent.log -O $4; mget rmmu_short_cryogenic$current_year_month* -O $4/rmmu_short; mget rmmu_long_cryogenic$current_year_month* -O $4/rmmu_long; mget rmmu_magnet$current_year_month* -O $4/rmmu_magnet; cd /cygdrive/g/monitoring/; mget monitor_System* -O $4/monitoring; mget monitor_cryocompressor* -O $4/monitoring; mget monitor_magnet* -O $4/monitoring"

# Pulls rmmu_short, long, magnet and rmmu from /cygdrive/g/LOG.
# Expect multiple rmmu_long files in this format: rmmu_long_cryogenic20230702030634.log
# Pulls monitoring from /cygdrive/g/monitoring

## lftp "open sftp://$2:$3@$1"
# sshpass -p Manager ssh remote@10.132.7.211
# ssh remote@10.141.164.214 -oKexAlgorithms=diffie-hellman-group14-sha1