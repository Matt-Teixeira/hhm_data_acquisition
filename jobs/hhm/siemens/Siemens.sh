# { SIEMENS 80
[ -z "$1" ] && POS_ARGS="$1"
### The above is just an if statement in square brackets, -z measures if the value passed is not null, therefore... ###
### if the positional arguments are not null, set the POS_ARGS variable as the passed parameters. ###
### Positional parameters that I know of are:
### "-k" insecure flag
### "--tlsv1.[1-3]"
### "--tls-max 1.[1-3]"
timeout 0.5 nc -zv $IP_ADDRESS 80 && curl $(echo -n "$POS_ARGS") "http://$IP_ADDRESS/service/autoreport/hold/EvtApplication_Today.txt" > "/opt/files/$PATH/Application.log"
# { DIFF CODE, LIKELY DOES NOT WORK, INCLUDED JUST IN CASE.
touch /opt/files/$PATH/Compare.log
diff /opt/files/$PATH/Compare.log /opt/files/$PATH/Application.log | sed 's/^[^ ]* //' | tail -n +2 > /opt/files/$PATH/EvtApplication_Today.txt
cp /opt/files/$PATH/EvtApplication_Today.txt /opt/files/$PATH/Compare.log
# } END DIFF CODE
# } END SIEMENS 80
# ----------------------------------------------------------------------------------------
# { SIEMENS 443
[ -z "$1" ] && POS_ARGS="$1"
### The above is just an if statement in square brackets, -z measures if the value passed is not null, therefore... ###
### if the positional arguments are not null, set the POS_ARGS variable as the passed parameters. ###
### Positional parameters that I know of are:
### "-k" insecure flag
### "--tlsv1.[1-3]"
### "--tls-max 1.[1-3]"
timeout 0.5 nc -zv $IP_ADDRESS 443 && curl $(echo -n "$POS_ARGS") "https://$IP_ADDRESS/service/autoreport/hold/EvtApplication_Today.txt" > "/opt/files//$PATH/Application.log"
# { DIFF CODE, LIKELY DOES NOT WORK, INCLUDED JUST IN CASE.
touch /opt/files/$PATH/Compare.log
diff /opt/files/$PATH/Compare.log /opt/files/$PATH/Application.log | sed 's/^[^ ]* //' | tail -n +2 > /opt/files/$PATH/EvtApplication_Today.txt
cp /opt/files/$PATH/EvtApplication_Today.txt /opt/files/$PATH/Compare.log
# } END DIFF CODE
# } END SIEMENS 443
# ----------------------------------------------------------------------------------------
