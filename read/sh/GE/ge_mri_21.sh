[ ! -d "$4" ] && mkdir $4
# lftp ftp://$2:$3@$1 -c "set net:reconnect-interval-base 5; set net:max-retries 2; cd /usr/g/service/log/ get $5 $4"

lftp -c "open ftp://$2:$3@$1; cd /usr/g/service/log/; mget -e gesys_*.log -O $4"

#  lfile -o $4/gesys_PCNMR001.log
# mirror --only-newer --include='gesys*' --exclude ".\+/$" --newer-than=now-7days