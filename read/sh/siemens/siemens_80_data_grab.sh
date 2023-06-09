# { SIEMENS 80
[ -z "$1" ] && POS_ARGS="$1"
### The above is just an if statement in square brackets, -z measures if the value passed is not null, therefore... ###
### if the positional arguments are not null, set the POS_ARGS variable as the passed parameters. ###
### Positional parameters that I know of are:
### "-k" insecure flag
### "--tlsv1.[1-3]"
### "--tls-max 1.[1-3]"

# Test PORT 80 connection
result_80=$(timeout 1 nc -zv $1 80 2>&1)

if [ $? -eq 0 ]; then
    # PORT 80 connection succeeded

    [ ! -d "$2" ] && mkdir $2

    curl $(echo -n "$POS_ARGS") "http://$1/service/autoreport/hold/EvtApplication_Today.txt" >"$2/Application.log"

    # { DIFF CODE, LIKELY DOES NOT WORK, INCLUDED JUST IN CASE.
    # touch /opt/files/$PATH/Compare.log
    # diff /opt/files/$PATH/Compare.log /opt/files/$PATH/Application.log | sed 's/^[^ ]* //' | tail -n +2 >/opt/files/$PATH/EvtApplication_Today.txt
    # cp /opt/files/$PATH/EvtApplication_Today.txt /opt/files/$PATH/Compare.log
    # } END DIFF CODE

else
    # PORT 88 connection failed
    # Test PORT 443 connection
    result_443=$(timeout 2 nc -zv $1 443 2>&1)

    if [ $? -eq 0 ]; then
        # PORT 443 connection succeeded

        [ ! -d "$2" ] && mkdir $2

        curl $(echo -n "$POS_ARGS") "https://$1/service/autoreport/hold/EvtApplication_Today.txt" >"$2/Application.log"

        # { DIFF CODE, LIKELY DOES NOT WORK, INCLUDED JUST IN CASE.
        # touch /opt/files/$PATH/Compare.log
        # diff /opt/files/$PATH/Compare.log /opt/files/$PATH/Application.log | sed 's/^[^ ]* //' | tail -n +2 >/opt/files/$PATH/EvtApplication_Today.txt
        # cp /opt/files/$PATH/EvtApplication_Today.txt /opt/files/$PATH/Compare.log
        # } END DIFF CODE

        variable='22_failed'
        echo $variable
    else
        # Catch fail in js logs
        variable='443_failed'
        echo $variable
    fi
fi
