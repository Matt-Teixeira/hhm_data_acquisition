#!/bin/bash

# BOMB SCRIPT FOR UNDEFINED VAR OR ERR DURING EXECUTION
set -ue

# SYNC THE REMOTE MMB LOG TO LOCAL FILE MIRROR

# "ssh -o KexAlgorithms=ecdh-sha2-nistp521"
# rsync -e ssh -r avante@172.31.3.51:/home/avante/host_logfiles /home/matt-teixeira/hep3/hhm_data_acquisition/test/15805
rsync -e ssh -rz $1@$2:/home/avante/host_logfiles $3
