files=$(lftp -c "open ftp://$2:$3@$1; cd SaveDevData; ls")
echo $files

# echo $files >$4/files_list.txt
# new_list=$(cat $4/files_list.txt);
