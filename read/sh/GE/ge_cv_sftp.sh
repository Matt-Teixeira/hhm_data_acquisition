[ ! -d "$4" ] && mkdir $4

lftp -c "set sftp:connect-program 'ssh -oKexAlgorithms=diffie-hellman-group1-sha1,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1'; set net:timeout 10; set ftp:ssl-allow off; set net:reconnect-interval-base 2; set net:max-retries 1; set xfer:clobber true; open sftp://$2:$3@$1;
cd /C/Program\ Files/GE\ Medical\ Systems/DL/Log/;
mget sysError.log -O $4"


#sshpass -p $3 scp -o StrictHostKeyChecking=accept-new -oKexAlgorithms=diffie-hellman-group1-sha1,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1 $2@$1:'/C/Program\ Files/GE\ Medical\ Systems/DL/Log/sysError.log' $4
