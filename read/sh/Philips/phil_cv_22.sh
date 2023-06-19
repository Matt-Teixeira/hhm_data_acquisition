[ ! -d "$4" ] && mkdir $4
sshpass -p $3 scp -r $2@$1:/cygdrive/c/ftproot/SaveDevData/* $4