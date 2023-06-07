result_22=$(timeout 2 nc -zv $1 22 2>&1)

# test exit status of result_22. If 0, then PORT 22 is open
if [ $? -eq 0 ]; then
    # Connection to PORT 22 succeeded
    variable="22 open"
    echo $variable
    [ ! -d "$4/" ] && mkdir $4/

    timeout 60 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new $2@$1:/cygdrive/d/Data_Logger/Logger.mdb $4

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

else
    # PORT 22 connection failed
    # Test PORT 21
    result_21=$(timeout 2 nc -zv $1 21 2>&1)

    # Test exit status of result_21. If 0, then PORT 21 is open
    if [ $? -eq 0 ]; then
        variable="21 open"
        echo $variable
    else
        variable='21_failed'
        echo $variable
    fi
fi

# { PHILIPS CT
# - name: Philips CT (SSH Copy)
#[ ! -d "/home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/CT/$4" ] && mkdir /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/CT/$4
#timeout 120 sshpass -p $3 ssh -o StrictHostKeyChecking=accept-new $2@$1 "cd /cygdrive/d/Data_Logger/; cp Logger.mdb Output.mdb"
# ----------------------------------------------------------------------------------------
# - name: Philips CT (SCP)
#timeout 240 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new $2@$1:/cygdrive/d/Data_Logger/Logger.mdb /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/CT/$4
