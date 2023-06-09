# { SIEMENS 443
[ -z "$1" ] && POS_ARGS="$1"
### The above is just an if statement in square brackets, -z measures if the value passed is not null, therefore... ###
### if the positional arguments are not null, set the POS_ARGS variable as the passed parameters. ###
### Positional parameters that I know of are:
### "-k" insecure flag
### "--tlsv1.[1-3]"
### "--tls-max 1.[1-3]"
timeout 0.5 nc -zv $1 443 && curl $(echo -n "$POS_ARGS") "https://$1/service/autoreport/hold/EvtApplication_Today.txt" >"$2/Application.log"
# { DIFF CODE, LIKELY DOES NOT WORK, INCLUDED JUST IN CASE.
touch $2/Compare.log
diff $2/Compare.log $2/Application.log | sed 's/^[^ ]* //' | tail -n +2 >$2/EvtApplication_Today.txt
cp $2/EvtApplication_Today.txt $2/Compare.log
