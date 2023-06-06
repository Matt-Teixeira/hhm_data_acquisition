# { GE CT
# ge_ct_user_1='service'
# ge_ct_pass_1='4rhelp'
# ge_ct_user_2='insite'
# ge_ct_pass_2='2getin'
# ge_ct_user_3='root'
# ge_ct_pass_3='#bigguy'

# Test port 22 connection
result=$(timeout 2 nc -zv $1 22 2>&1)

if [ $? -eq 0 ]; then
    # Connection succeeded
    variable=true
    [ ! -d "/home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/CT/$4" ] && mkdir /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/CT/$4
    timeout 3 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new -oKexAlgorithms=diffie-hellman-group1-sha1,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1 $2@$1:/usr/g/service/log/gesys*.log /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/CT/$4
else
    # Connection failed
    result_21=$(timeout 2 nc -zv $1 21 2>&1)

    if [ $? -eq 0 ]; then
        [ ! -d "/home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/CT/$4" ] && mkdir /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/CT/$4
        timeout 10 lftp ftp://$2:$3@$1 -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --exclude ".\+/$" --newer-than=now-7days /usr/g/service/log/ /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/GE/CT/$4"
        variable='22_failed'
        echo $variable
    else
        variable='21_failed'
        echo $variable
    fi
fi

# (SCP)
# ----------------------------------------------------------------------------------------
#timeout 5 sshpass -p $ge_ct_pass_1 scp -o StrictHostKeyChecking=accept-new $ge_ct_user_1@$1:/usr/g/service/log/gesys*.log /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm

# (FTP)
# ----------------------------------------------------------------------------------------
#timeout 20 lftp ftp://$ge_ct_user_1:$ge_ct_pass_1@$1 -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --exclude ".\+/$" --newer-than=now-7days /usr/g/service/log/ /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm"

# (Notes)
# ----------------------------------------------------------------------------------------
# 1)
# lftp ftp://$ge_ct_user_1:$ge_ct_pass_1@$IP_ADDRESS (ftp://username:password@hostname)
# This part establishes an FTP connection to the server specified by $IP_ADDRESS using the username stored
# in the variable $ge_ct_user_1 and the password stored in $ge_ct_pass_1.

# 2)
# set net:reconnect-interval-base 5
# This command sets the base interval for reconnection attempts to 5 seconds.
# It determines the time delay between reconnection attempts in case the connection is lost during the file transfer.

# 3)
# set net:max-retries 2
# This command sets the maximum number of retries for connection reestablishment to 2.
# After the initial connection failure, lftp will attempt to reconnect a maximum of 2 times.

# 4)
# mirror --only-newer --include='gesys*' --newer-than=now-7days /usr/g/service/log/ /opt/files/SME*
# This command uses the mirror command in lftp to synchronize files between the source and destination directories.
# Here, it mirrors files from the source directory /usr/g/service/log/ on the FTP server to the
# destination directory /opt/files/SME* locally. It only transfers newer files (--only-newer) and includes files
# matching the pattern 'gesys*'. The --newer-than=now-7days option ensures that only files modified within the
# last 7 days are considered for synchronization
