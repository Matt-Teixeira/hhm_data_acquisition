# { GE CT

# ----------------------------------------------------------------------------------------
# (SCP)
timeout 120 sshpass -p $ge_ct_pass_1 scp -o StrictHostKeyChecking=accept-new $ge_ct_user_1@$IP_ADDRESS:/usr/g/service/log/gesys*.log /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm
timeout 120 sshpass -p $ge_ct_pass_2 scp -o StrictHostKeyChecking=accept-new $ge_ct_user_2@$IP_ADDRESS:/usr/g/service/log/gesys*.log /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm
timeout 120 sshpass -p $ge_ct_pass_3 scp -o StrictHostKeyChecking=accept-new $ge_ct_user_3@$IP_ADDRESS:/usr/g/service/log/gesys*.log /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm

# (FTP)
timeout 120 lftp ftp://$ge_ct_user_1:$ge_ct_pass_1@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --newer-than=now-7days /usr/g/service/log/ /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm"

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

