# { GE MRI
ge_mr_user_1: 'service'
ge_mr_pass_1: '4rhelp'
ge_mr_user_2: 'insite'
ge_mr_pass_2: '2getin'
ge_mr_user_3: 'root'
ge_mr_pass_3: 'operator'

timeout 120 lftp ftp://$ge_mr_user_1:$ge_mr_pass_1@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --include='gesys*' --newer-than=now-7days /usr/g/service/log/ /opt/files/$PATH/"

# (SCP)
timeout 120 sshpass -p $ge_mr_pass_1 scp -o StrictHostKeyChecking=accept-new $ge_mr_user_1@$IP_ADDRESS:/usr/g/service/log/gesys*.log /opt/files/$PATH/


### Additional Note: There may be MRI machines for which logfiles are only stored on a separate directory, /export/home/*-something,
### Tracking these down hasn't been the team's priority, so it's been on the back-burner.  If it becomes a priority, let me know.