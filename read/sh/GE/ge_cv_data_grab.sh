# { GE MRI

# Test port 22 connection
result=$(timeout 2 nc -zv $1 22 2>&1)

if [ $? -eq 0 ]; then
    # Connection succeeded
    variable=true

    [ ! -d "$4" ] && mkdir $4
    timeout 3 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new -oKexAlgorithms=diffie-hellman-group1-sha1,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1 $2@$1:'/C/Program\ Files/GE\ Medical\ Systems/DL/Log/sysError.log' $4
    [ -s "$4/sysError.log" ] && chmod +644 $4/sysError.log
else
    # Connection failed
    result_21=$(timeout 2 nc -zv $1 21 2>&1)

    if [ $? -eq 0 ]; then
        [ ! -d "$4" ] && mkdir $4
        timeout 10 lftp ftp://$2:$3@$1 -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='sys*' --newer-than=now-7days /C/Program\ Files/GE\ Medical\ Systems/DL/Log/ $4"
        [ -s "$4/sysError.log" ] && mv $4/sysError.log $4/sysError/sysError.log
        [ -s "$4/sysError.log" ] && chmod +644 $4/sysError/sysError.log
        variable='22_failed'
        echo $variable
    else
        variable='21_failed'
        echo $variable
    fi
fi

# { GE CV
# (FTP)
# [ ! -d "/opt/files/$PATH/sysError/" ] && mkdir /opt/files/$PATH/sysError/
# timeout 120 lftp ftp://$USER_1:$PASS_1@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='sys*' --newer-than=now-7days /c/Program\ Files/GE\ Medical\ Systems/DL/Log/ /opt/files/$PATH/"
# [ -s "/opt/files/$PATH/sysError.log" ] && mv /opt/files/$PATH/sysError.log /opt/files/$PATH/sysError/sysError.log
# [ -s "/opt/files/$PATH/sysError.log" ] && chmod +644 /opt/files/$PATH/sysError/sysError.log
# (SCP)
# timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/c/Program\ Files/GE\ Medical\ Systems/DL/Log/sys* /opt/files/$PATH/
# [ -s "/opt/files/$PATH/sysError.log" ] && chmod +644 /opt/files/$PATH/sysError/sysError.log
