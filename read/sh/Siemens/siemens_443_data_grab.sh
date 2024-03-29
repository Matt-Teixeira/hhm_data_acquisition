# { SIEMENS 443
[ -z "$1" ] && POS_ARGS="$1"
### The above is just an if statement in square brackets, -z measures if the value passed is not null, therefore... ###
### if the positional arguments are not null, set the POS_ARGS variable as the passed parameters. ###
### Positional parameters that I know of are:
### "-k" insecure flag
### "--tlsv1.[1-3]"
### "--tls-max 1.[1-3]"
[ ! -d "$2" ] && mkdir $2
curl -k -m 20 https://$1/service/autoreport/hold/EvtApplication_Today.txt >"$2/Application.log"

# curl -k -m 10 https://10.3.61.250/service/autoreport/hold/EvtApplication_Today.txt >"/home/matt-teixeira/hep3/hhm_data_acquisition/test_logs/Application.log"
