[ ! -d "$4" ] && mkdir $4
timeout 3 sshpass -v -p $3 scp -o StrictHostKeyChecking=accept-new -oKexAlgorithms=diffie-hellman-group1-sha1,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1 $2@$1:'/C/Program\ Files/GE\ Medical\ Systems/DL/Log/sysError.log' $4
[ -s "$4/sysError.log" ] && chmod +644 $4/sysError.log
