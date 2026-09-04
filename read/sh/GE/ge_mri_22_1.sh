#!/bin/bash
# SEC-004: the password arrives via SSHPASS (sshpass -e), never on the command
# line, where it was readable in /proc/*/cmdline for the life of the transfer
# and was embedded in node's execFile rejection message. $3 remains a
# positional placeholder until every family is converted.
: "${SSHPASS:?SSHPASS must be set by the caller}"

mkdir -p "$4"

# BUG-023: sshpass is SILENT on its own failures, so the only stderr the caller
# sees is ssh's benign "Permanently added" warning -- which used to get
# classified as a host-key problem whatever the real cause was. Translate
# sshpass's exit codes into text the classifier recognises.
# sshpass(1): 5 = invalid/incorrect password, 6 = host public key is unknown.
explain_sshpass_rc() {
  case "$1" in
    5) echo "sshpass: incorrect password (exit 5)" >&2 ;;
    6) echo "sshpass: host public key is unknown (exit 6)" >&2 ;;
  esac
}

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
rc=$?
explain_sshpass_rc "$rc"
exit "$rc"
