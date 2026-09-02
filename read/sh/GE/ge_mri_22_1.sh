#!/bin/bash
# SEC-004: the password arrives via SSHPASS (sshpass -e), never on the command
# line, where it was readable in /proc/*/cmdline for the life of the transfer
# and was embedded in node's execFile rejection message. $3 remains a
# positional placeholder until every family is converted.
: "${SSHPASS:?SSHPASS must be set by the caller}"

mkdir -p "$4"

SSH_OPTS="
  -o StrictHostKeyChecking=accept-new \
  -o KexAlgorithms=+diffie-hellman-group14-sha1  \
  -o HostKeyAlgorithms=+ssh-rsa \
  -o PubkeyAcceptedAlgorithms=+ssh-rsa \
  -o ConnectTimeout=10 \
  -o ServerAliveInterval=10 \
  -o ServerAliveCountMax=6
"

# $SSH_OPTS is deliberately UNQUOTED: it is a multi-option string that relies
# on word splitting. The remote spec IS quoted so the glob is expanded by the
# remote shell, not locally.
timeout 240 sshpass -e scp $SSH_OPTS "$2@$1:/usr/g/service/log/gesys*.log" "$4"
