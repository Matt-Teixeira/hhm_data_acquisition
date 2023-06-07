# ----------------------------------------------------------------------------------------
# { PHILIPS CV
- name: Philips CV (FTP)
timeout 120 lftp ftp://$USER_1:$PASS_1@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/ /opt/files/$PATH/"
RECENTFILE="$(find /opt/files/$PATH//*/*  -type f -name 'Event.zip' -printf "%T+ - %p\n" | sort -n | tail -1 | awk '{print $3}')"
unzip -o "$RECENTFILE" -d /opt/files/$PATH/
# { VARIANTS (FTP)
timeout 120 lftp ftp://$USER_1:$PASS_1@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/ /opt/files/$PATH/"
RECENTFILE="$(find /opt/files/$PATH//*/*  -type f -name 'Event.zip' -printf "%T+ - %p\n" | sort -n | tail -1 | awk '{print $3}')"
unzip -o "$RECENTFILE" -d /opt/files/$PATH/
# ----------------------------------------------------------------------------------------
timeout 120 lftp ftp://$USER_2:$PASS_2@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/ /opt/files/$PATH/"
RECENTFILE="$(find /opt/files/$PATH//*/*  -type f -name 'Event.zip' -printf "%T+ - %p\n" | sort -n | tail -1 | awk '{print $3}')"
unzip -o "$RECENTFILE" -d /opt/files/$PATH/
# ----------------------------------------------------------------------------------------
timeout 120 lftp ftp://$USER_3:$PASS_3@$IP_ADDRESS -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/ /opt/files/$PATH/"
RECENTFILE="$(find /opt/files/$PATH//*/*  -type f -name 'Event.zip' -printf "%T+ - %p\n" | sort -n | tail -1 | awk '{print $3}')"
unzip -o "$RECENTFILE" -d /opt/files/$PATH/
# ----------------------------------------------------------------------------------------
#  - name: Philips CV (SFTP)
timeout 120 sshpass -p $PASS_4 scp -r $USER_4@$IP_ADDRESS:/cygdrive/c/ftproot/SaveDevData/* /opt/files/$PATH/
# ----------------------------------------------------------------------------------------
# }
# { PHILIPS CT
# - name: Philips CT (SSH Copy)
timeout 120 sshpass -p $PASS_1 ssh -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS "cd /cygdrive/d/Data_Logger/; cp Logger.mdb Output.mdb"
# ----------------------------------------------------------------------------------------
# - name: Philips CT (SCP)
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/d/Data_Logger/Logger.mdb /opt/files/$PATH/
# ----------------------------------------------------------------------------------------
### UPON FAILURE OF THE ABOVE CODE BLOCK, PERFORM THE FOLLOWING:	###
### NORMALLY, I'D DO A '||', BUT HOWEVER WORKS BEST FOR YOU MATT.	###
# - name: Philips CT (SFTP)
timeout 120 lftp sftp://$USER_1:$PASS_1@$IP_ADDRESS -e "set xfer:clobber on; cd /cygdrive/d/Data_Logger/;lcd /opt/files/$PATH/; get Output.mdb; exit"

chmod +0644 /opt/files/$PATH/Output.mdb
# { BEGIN CONVERSION
now_ISO8601=$(date -u +"%Y-%m-%dT%H:%M:00Z")
if [[ -f "/opt/files/$PATH/Output.mdb" ]] ; then
chmod +644 /opt/files/$PATH/Output.mdb
TABLEVAR=$(mdb-tables /opt/files/$PATH/Output.mdb | sed 's/ /\n/g')
touch /opt/files/$PATH/Logger.output
fi
if [[ -e /opt/files/$PATH/Logger.output ]] ; then
echo -n "" > /opt/files/$PATH/Logger.output
fi
# { FOR A SINGLE FILE.
#while read -r tableheaders;
#do
#       echo "I READ A LINE!"
#       echo "[START CAPTURE BLOCK : ${now_ISO8601}]" >> /opt/files/$PATH/Logger.output
#       echo "[reading] : $tableheaders" >> /opt/files/$PATH/Logger.output
#       mdb-export /opt/files/$PATH/Output.mdb $tableheaders >> /opt/files/$PATH/Logger.output
#       echo "[/reading] : $tableheaders" >> /opt/files/$PATH/Logger.output
#       echo "[END CAPTURE BLOCK : ${now_ISO8601}]" >> /opt/files/$PATH/Logger.output
#done <<< "$TABLEVAR"
# } END SINGLE-FILE PROCESSING
EALINFO_TABLEVAR=$(mdb-tables /opt/files/$PATH/Output.mdb | sed 's/ /\n/g' | sed -n 1p)
EVENTS_TABLEVAR=$(mdb-tables /opt/files/$PATH/Output.mdb | sed 's/ /\n/g' | sed -n 2p)
# { ACCOUNT FOR EXISTING LOGS
touch /opt/files/$PATH/EALInfo.output
if [[ -e /opt/files/$PATH/EALInfo.output ]] ; then
echo -n "" > /opt/files/$PATH/EALInfo.output
fi
touch /opt/files/$PATH/Events.output
if [[ -e /opt/files/$PATH/Events.output ]] ; then
echo -n "" > /opt/files/$PATH/Events.output
fi
# } END ACCOUNTING FOR EXISTING LOGS
# { PREPROCESSING
# Capture Blocks commented out, per Matt's request.
#echo "[START CAPTURE BLOCK : ${now_ISO8601}]" >> /opt/files/$PATH/Events.output
#echo "[reading] : $EVENTS_TABLEVAR" >> /opt/files/$PATH/Events.output
# FUDGING THE HEADERS IN
echo "Type,Level,Module,TStampNum,DataTime,Msg,EAL,BLOB,EventTime" >> /opt/files/$PATH/Events.output
# IN ORDER PIPED COMMANDS:
# EXPORT FROM MDB
# REMOVE ALL NON-ALPHANUMERIC CHARACTERS, KEEP THOSE IN SINGLE QUOTES
# REORDER COLUMNS
# SORT REORDERED COLUMNS
# REMOVE ALL NON-COMPLIANT ROWS
# OUTPUT FILE
mdb-export /opt/files/$PATH/Output.mdb $EVENTS_TABLEVAR | tr -cd [:alnum:]'\n''\ ''"'',''['']'':''\-''_''.''/''=' | awk -v FS="," '{print $9, $1, $2, $3, $4, $5, $6, $7, $8}' | sort | sed -n -e "/^\"[0-9][0-9]\/.*/p" >> /opt/files/$PATH/Events.output
#echo "[/reading] : $EVENTS_TABLEVAR" >> /opt/files/$PATH/Events.output
#echo "[END CAPTURE BLOCK : ${now_ISO8601}]" >> /opt/files/$PATH/Events.output
#echo "[START CAPTURE BLOCK : ${now_ISO8601}]" >> /opt/files/$PATH/EALInfo.output
#echo "[reading] : $EALINFO_TABLEVAR" >> /opt/files/$PATH/EALInfo.output
# MAY HAVE TO FUDGE HEADERS IN BELOW THIS COMMENTED LINE
echo "DTime,Controller,DataType,LogNumber,TmStamp,ERR_TYPE,ErrNum,vxwErrNo,File,Line,Param1,Param2,Info,EalTime" >> /opt/files/$PATH/EALInfo.output
mdb-export /opt/files/$PATH/Output.mdb $EALINFO_TABLEVAR | tail -n +2 | sort | awk 'NF > 2' >> /opt/files/$PATH/EALInfo.output
#echo "[/reading] : $EALINFO_TABLEVAR" >> /opt/files/$PATH/EALInfo.output
#echo "[END CAPTURE BLOCK : ${now_ISO8601}]" >> /opt/files/$PATH/EALInfo.output
# } END CONVERSION/PREPROCESSING
# ---------------------------------------------------------------------------------------
# }
# { PHILIPS MRI
# ----------------------------------------------------------------------------------------
# - name: Philips MR (SCP/All)
mkdir -p /opt/files/$PATH/rmmu_long
mkdir -p /opt/files/$PATH/rmmu_short
mkdir -p /opt/files/$PATH/rmmu_magnet
mkdir -p /opt/files/$PATH/monitoring
# - name: Philips MR (SCP, default credentials)
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/Log/logcurrent.log /opt/files/$PATH/
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/Log/rmmu_short* /opt/files/$PATH/rmmu_short/
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/Log/rmmu_long* /opt/files/$PATH/rmmu_long/
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/Log/rmmu_magnet* /opt/files/$PATH/rmmu_magnet/
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/Site/rmmu_short* /opt/files/$PATH/rmmu_short/
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/Site/rmmu_long* /opt/files/$PATH/rmmu_long/
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/Site/rmmu_magnet* /opt/files/$PATH/rmmu_magnet/
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/Site/monitor_* /opt/files/$PATH/monitoring/
timeout 240 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/cygdrive/g/monitoring/monitor_* /opt/files/$PATH/monitoring/
# ----------------------------------------------------------------------------------------
# { VARIANTS (SCP)
# - name: Philips MR (SCP, Alt Creds 1)
timeout 120 sshpass -p $PASS_2 scp -o StrictHostKeyChecking=accept-new $USER_2@$IP_ADDRESS:/cygdrive/g/Log/logcurrent.log /opt/files/$PATH/
timeout 120 sshpass -p $PASS_2 scp -o StrictHostKeyChecking=accept-new $USER_2@$IP_ADDRESS:/cygdrive/g/Log/rmmu* /opt/files/$PATH/rmmu_long/
timeout 120 sshpass -p $PASS_2 scp -o StrictHostKeyChecking=accept-new $USER_2@$IP_ADDRESS:/cygdrive/g/Site/rmmu* /opt/files/$PATH/rmmu_long/
timeout 120 sshpass -p $PASS_2 scp -o StrictHostKeyChecking=accept-new $USER_2@$IP_ADDRESS:/cygdrive/g/Site/monitor_* /opt/files/$PATH/monitoring/
timeout 120 sshpass -p $PASS_2 scp -o StrictHostKeyChecking=accept-new $USER_2@$IP_ADDRESS:/cygdrive/g/monitoring/monitor_* /opt/files/$PATH/monitoring/
# ----------------------------------------------------------------------------------------
# - name: Philips MR (SCP, Alt Creds 2)
timeout 120 sshpass -p $PASS_3 scp -o StrictHostKeyChecking=accept-new $USER_3@$IP_ADDRESS:/cygdrive/g/Log/logcurrent.log /opt/files/$PATH/
timeout 120 sshpass -p $PASS_3 scp -o StrictHostKeyChecking=accept-new $USER_3@$IP_ADDRESS:/cygdrive/g/Log/rmmu* /opt/files/$PATH/rmmu_long/
timeout 120 sshpass -p $PASS_3 scp -o StrictHostKeyChecking=accept-new $USER_3@$IP_ADDRESS:/cygdrive/g/Site/rmmu* /opt/files/$PATH/rmmu_long/
timeout 120 sshpass -p $PASS_3 scp -o StrictHostKeyChecking=accept-new $USER_3@$IP_ADDRESS:/cygdrive/g/Site/monitor_* /opt/files/$PATH/monitoring/
timeout 120 sshpass -p $PASS_3 scp -o StrictHostKeyChecking=accept-new $USER_3@$IP_ADDRESS:/cygdrive/g/monitoring/monitor_* /opt/files/$PATH/monitoring/
# ----------------------------------------------------------------------------------------
# }
# { MMB
mkdir -p /opt/files/$PATH/../hhm/
mkdir -p /opt/files/$PATH/../hhm/rmmu_short/
mkdir -p /opt/files/$PATH/../hhm/rmmu_long/
mkdir -p /opt/files/$PATH/../hhm/rmmu_magnet/
mkdir -p /opt/files/$PATH/../hhm/monitoring/
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/home/avante/host_logfiles/rmmu_short* /opt/files/$PATH/../hhm/rmmu_short/
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/home/avante/host_logfiles/rmmu_long* /opt/files/$PATH/../hhm/rmmu_long/
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/home/avante/host_logfiles/rmmu_magnet* /opt/files/$PATH/../hhm/rmmu_magnet/
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/home/avante/host_logfiles/monitor* /opt/files/$PATH/../hhm/monitoring/
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/home/avante/V*.log /opt/files/$PATH/
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/home/avante/v*.log /opt/files/$PATH/
timeout 120 sshpass -p $PASS_1 scp -o StrictHostKeyChecking=accept-new $USER_1@$IP_ADDRESS:/home/avante/v*.csv /opt/files/$PATH/
### Below used to copy Philips MRI files to their corresponding hhm directory, likely no need for that now.
#      MERGEPATH=$(find /opt/files/ -name "{{ sme }}" -type d | sed -n 1p)
#      MERGEPATH=$(echo -n "$MERGEPATH" | echo '/')
#      cp /opt/files/$PATH/logcurrent.log $MERGEPATH
#      cp /opt/files/$PATH/rmmu* $MERGEPATH
#      cp /opt/files/$PATH/monitor_* $MERGEPATH
# ----------------------------------------------------------------------------------------
# }

