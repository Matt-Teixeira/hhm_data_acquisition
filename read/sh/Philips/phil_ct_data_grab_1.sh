set -ue
[ ! -d "$4" ] && mkdir $4

# lftp -c "open ftp://$2:$3@$1; cd /C/Program\ Files/GE\ Medical\ Systems/DL/Log/; mget -e sysError.log -O $4/sysError"
# lftp sftp://$2:$3@$1 -e "set xfer:clobber on; cd /cygdrive/d/Data_Logger/;lcd $4/; get Output.mdb; exit"

timeout 10 lftp -c "set net:timeout 10; open sftp://$2:$3@$1; cd /cygdrive/d/Data_Logger/; mget -e Output.mdb -O $4; exit"
chmod +0644 $4/Output.mdb
# { BEGIN CONVERSION
now_ISO8601=$(date -u +"%Y-%m-%dT%H:%M:00Z")

test "$(ls -l $4/Output.mdb | awk '{print $5}')" -gt "0" && chmod +0644 $4/Output.mdb

EALINFO_TABLEVAR=$(mdb-tables $4/Output.mdb | sed 's/ /\n/g' | sed -n 1p)
EVENTS_TABLEVAR=$(mdb-tables $4/Output.mdb | sed 's/ /\n/g' | sed -n 2p)
# { ACCOUNT FOR EXISTING LOGS
touch $4/Events.output
test "$(ls -l $4/Events.output | awk '{print $5}')" -gt "0" && echo -n "" >$4/Events.output

touch $4/EALInfo.output
test "$(ls -l $4/EALInfo.output | awk '{print $5}')" -gt "0" && echo -n "" >$4/EALInfo.output

echo "Type,Level,Module,TStampNum,DataTime,Msg,EAL,BLOB,EventTime" >>$4/Events.output
# IN ORDER PIPED COMMANDS:
# EXPORT FROM MDB
# REMOVE ALL NON-ALPHANUMERIC CHARACTERS, KEEP THOSE IN SINGLE QUOTES
# REORDER COLUMNS
# SORT REORDERED COLUMNS
# REMOVE ALL NON-COMPLIANT ROWS
# OUTPUT FILE
mdb-export $4/Output.mdb $EVENTS_TABLEVAR | tr -cd [:alnum:]'\n''\ ''"'',''['']'':''\-''_''.''/''=' | awk -v FS="," '{print $9, $1, $2, $3, $4, $5, $6, $7, $8}' | sort | sed -n -e "/^\"[0-9][0-9]\/.*/p" >>$4/Events.output
#echo "[/reading] : $EVENTS_TABLEVAR" >> /opt/files/$PATH/Events.output
#echo "[END CAPTURE BLOCK : ${now_ISO8601}]" >> /opt/files/$PATH/Events.output
#echo "[START CAPTURE BLOCK : ${now_ISO8601}]" >> /opt/files/$PATH/EALInfo.output
#echo "[reading] : $EALINFO_TABLEVAR" >> /opt/files/$PATH/EALInfo.output
# MAY HAVE TO FUDGE HEADERS IN BELOW THIS COMMENTED LINE
echo "DTime,Controller,DataType,LogNumber,TmStamp,ERR_TYPE,ErrNum,vxwErrNo,File,Line,Param1,Param2,Info,EalTime" >>$4/EALInfo.output
mdb-export $4/Output.mdb $EALINFO_TABLEVAR | tail -n +2 | sort | awk 'NF > 2' >>$4/EALInfo.output

exit

# mget: Access failed: No such file (Output.mdb)
## set net:timeout 10; 