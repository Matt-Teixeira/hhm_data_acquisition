[ ! -d "$6" ] && mkdir $6
current_date=$(date +'%Y_%m_%d')
echo $current_date

lftp -c "set net:timeout 10; set ftp:ssl-allow off; set net:reconnect-interval-base 5; set net:max-retries 1; set xfer:clobber true; 
open sftp://$2:$3@$1; 
cd $4;
mget *$5$current_date* -O $6"


# $1 IP Address

# $2 Username

# $3 Password

# $4 Path to file on Cerberus
## Ex: 'C027932/SHIP013/SME01441'

# $5 String fragment to build file name
## Ex: 'error_A1_'

# $6 Path on debian
## Ex: '/home/prod/hhm_data_acquisition/files/SME01441'
