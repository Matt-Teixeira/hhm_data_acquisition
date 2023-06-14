[ ! -d "$4" ] && mkdir $4
[ ! -d "$4/sysError" ] && mkdir $4/sysError
timeout 120 lftp ftp://$2:$3@$1 -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='sys*' --newer-than=now-7days /C/Program\ Files/GE\ Medical\ Systems/DL/Log/ $4"
[ -s "$4/sysError.log" ] && mv $4/sysError.log $4/sysError/sysError.log
[ -s "$4/sysError.log" ] && chmod +644 $4/sysError/sysError.log
