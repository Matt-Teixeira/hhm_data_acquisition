#!/bin/bash

# BOMB SCRIPT FOR UNDEFINED VAR OR ERR DURING EXECUTION
set -ue

# $1: Monitoring files on server's rsynced folder (host_logfiles)
# $1 Ex: /home/matt-teixeira/hep3/hhm_data_acquisition/test/SME15805//host_logfiles/monitoring_*.dat
# $2: Monitoring file path
# $2 Ex: /home/matt-teixeira/hep3/hhm_data_acquisition/test/SME15805/monitoring


if [[ ! -e $2 ]]; then
    mkdir -p $2
    rsync -z $1 $2
else
    rsync -z $1 $2
fi
