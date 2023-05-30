# ----------------------------------------------------------------------------------------
# { GE CV
# (FTP)
[ ! -d "/opt/files/$PATH/sysError/" ] && mkdir /opt/files/$PATH/sysError/
timeout 120 lftp ftp://$USER_1:$PASS_1@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='sys*' --newer-than=now-7days /c/Program\ Files/GE\ Medical\ Systems/DL/Log/ /opt/files/$PATH/"
[ -s "/opt/files/$PATH/sysError.log" ] && mv /opt/files/$PATH/sysError.log /opt/files/$PATH/sysError/sysError.log
[ -s "/opt/files/$PATH/sysError.log" ] && chmod +644 /opt/files/$PATH/sysError/sysError.log
# (SCP)
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/c/Program\ Files/GE\ Medical\ Systems/DL/Log/sys* /opt/files/$PATH/
[ -s "/opt/files/$PATH/sysError.log" ] && chmod +644 /opt/files/$PATH/sysError/sysError.log
# ----------------------------------------------------------------------------------------
# { GE CT
# (FTP)
timeout 120 lftp ftp://$USER_1:$PASS_1@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --newer-than=now-7days /usr/g/service/log/ /opt/files/$PATH/"
# ----------------------------------------------------------------------------------------
# (SCP)
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/usr/g/service/log/gesys*.log /opt/files/$PATH/
timeout 120 sshpass -p $PASS_2 scp -o StrictHostKeyChecking=accept-new $USER_2@$IP_ADDRESS:/usr/g/service/log/gesys*.log /opt/files/$PATH/
timeout 120 sshpass -p $PASS_3 scp -o StrictHostKeyChecking=accept-new $USER_3@$IP_ADDRESS:/usr/g/service/log/gesys*.log /opt/files/$PATH/
# ----------------------------------------------------------------------------------------
# { GE MRI
timeout 120 lftp ftp://$USER_1:$PASS_1@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --newer-than=now-7days /usr/g/service/log/ /opt/files/$PATH/"
timeout 120 lftp ftp://$USER_2:$PASS_2@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --newer-than=now-7days /usr/g/service/log/ /opt/files/$PATH/"
timeout 120 lftp ftp://$USER_3:$PASS_3@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --newer-than=now-7days /usr/g/service/log/ /opt/files/$PATH/"
# (SCP)
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/usr/g/service/log/gesys*.log /opt/files/$PATH/
timeout 120 sshpass -p $PASS_2 scp -o StrictHostKeyChecking=accept-new $USER_2@$IP_ADDRESS:/usr/g/service/log/gesys*.log /opt/files/$PATH/
timeout 120 sshpass -p $PASS_3 scp -o StrictHostKeyChecking=accept-new $USER_3@$IP_ADDRESS:/usr/g/service/log/gesys*.log /opt/files/$PATH/

### Additional Note: There may be MRI machines for which logfiles are only stored on a separate directory, /export/home/*-something,
### Tracking these down hasn't been the team's priority, so it's been on the back-burner.  If it becomes a priority, let me know.

# ----------------------------------------------------------------------------------------
#  PLAINTEXT CREDS.
# So, these are normally stored in the ansible vault, made variables at playbook execution, and called directly with sshpass or lftp as per situation requirement.
# To be fair, I have concerns about the approach I use, but I lack the time, or knowledge, to effectively put those concerns to rest, particularly as it relates to the project's deadlines.

ge_cv_user_1: 'DLService'
ge_cv_pass_1: 'HEROIC'
ge_cv_user_2: 'DL_Service'
ge_cv_pass_2: 'HEROIC'
ge_ct_user_1: 'service'
ge_ct_pass_1: '4rhelp'
ge_ct_user_2: 'insite'
ge_ct_pass_2: '2getin'
ge_ct_user_3: 'root'
ge_ct_pass_3: '#bigguy'
ge_mr_user_1: 'service'
ge_mr_pass_1: '4rhelp'
ge_mr_user_2: 'insite'
ge_mr_pass_2: '2getin'
ge_mr_user_3: 'root'
ge_mr_pass_3: 'operator'

