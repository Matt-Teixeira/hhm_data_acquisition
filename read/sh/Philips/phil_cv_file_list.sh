files=$(lftp -c "set net:timeout 5; set ftp:ssl-allow off; set net:reconnect-interval-base 5; set net:max-retries 2; open ftp://$2:$3@$1; cd SaveDevData; ls")
echo $files

# echo $files >$4/files_list.txt
# new_list=$(cat $4/files_list.txt);
