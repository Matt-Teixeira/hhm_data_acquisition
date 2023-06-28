[ ! -d "$4" ] && mkdir $4
[ ! -d "$4/sysError" ] && mkdir $4/sysError
lftp -c "set net:timeout 10; set ftp:ssl-allow off; set net:reconnect-interval-base 5; set net:max-retries 2; open ftp://$2:$3@$1; cd /C/Program\ Files/GE\ Medical\ Systems/DL/Log/; mget -e sysError.log -O $4/sysError"
