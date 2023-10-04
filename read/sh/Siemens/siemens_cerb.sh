[ ! -d "$5" ] && mkdir $5
current_date=$(date +'%Y_%m_%d')
echo $current_date

lftp -c "set net:timeout 10; set ftp:ssl-allow off; set net:reconnect-interval-base 5; set net:max-retries 1; set xfer:clobber true; 
open sftp://$2:$3@$1; 
cd $4;
mget *error_A1_$current_date* -O $5"
