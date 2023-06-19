files=$(lftp -c "open ftp://$2:$3@$1; cd SaveDevData; ls")

echo $files

# echo $files | grep_files=$(grep -A 10 -n daily_2023_06_12)

# echo $grep_files

