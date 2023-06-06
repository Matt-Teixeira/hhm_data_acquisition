# { GE MRI

# Test port 22 connection
result=$(timeout 1 nc -zv $1 22 2>&1)

if [ $? -eq 0 ]; then
    # Connection succeeded

    [ ! -d "/home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/MRI/$4" ] && mkdir /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/MRI/$4
    timeout 3 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new -oKexAlgorithms=diffie-hellman-group1-sha1,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1 $2@$1:/usr/g/service/log/gesys*.log /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/MRI/$4
else
    # Connection failed
    result_21=$(timeout 1 nc -zv $1 21 2>&1)

    if [ $? -eq 0 ]; then
        [ ! -d "/home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/MRI/$4" ] && mkdir /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/MRI/$4
        timeout 3 lftp ftp://$2:$3@$1 -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --exclude ".\+/$" --newer-than=now-7days /usr/g/service/log/ /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/MRI/$4"
        variable='22_failed'
        echo $variable
    else
        variable='21_failed'
        echo $variable
    fi
fi

# /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/MRI/$4
# /opt/files/$4/hhm