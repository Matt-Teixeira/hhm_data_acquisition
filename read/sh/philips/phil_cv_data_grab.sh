result_22=$(timeout 2 nc -zv $1 22 2>&1)

# test exit status of result_22. If 0, then PORT 22 is open
if [ $? -eq 0 ]; then
    # Connection to PORT 22 succeeded
    variable=true
    [ ! -d "$4" ] && mkdir $4
    timeout 500 sshpass -p $3 scp -r $2@$1:/cygdrive/c/ftproot/SaveDevData/* $4
else
    # PORT 22 connection failed
    # Test PORT 21
    result_21=$(timeout 2 nc -zv $1 21 2>&1)

    # Test exit status of result_21. If 0, then PORT 21 is open
    if [ $? -eq 0 ]; then
        variable=false
        [ ! -d "$4" ] && mkdir $4
        timeout 120 lftp ftp://$2:$3@$1 -e "set net:reconnect-interval-base 5; set net:max-retries 2; mirror --only-newer --exclude 'Trace*' /SaveDevData/ $4"
        RECENTFILE="$(find $4/*/* -type f -name 'Event.zip' -printf "%T+ - %p\n" | sort -n | tail -1 | awk '{print $3}')"
        unzip -o "$RECENTFILE" -d $4
    else
        variable='21_failed'
        echo $variable
    fi
fi

