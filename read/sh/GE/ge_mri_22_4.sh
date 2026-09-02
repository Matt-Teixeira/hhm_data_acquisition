#!/usr/bin/env bash
set -euo pipefail

# SEC-004: the password arrives via SSHPASS (sshpass -e), never on the command
# line. $3 remains a positional placeholder until every family is converted.
: "${SSHPASS:?SSHPASS must be set by the caller}"

host="$1"
user="$2"
dest="$4"

mkdir -p "$dest"

SSH_OPTS=(
  -T
  -o StrictHostKeyChecking=accept-new
  -o KexAlgorithms=diffie-hellman-group1-sha1,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1,diffie-hellman-group14-sha256
  # BUG-021: these hosts offer only ssh-rsa,ssh-dss host keys, which modern
  # OpenSSH refuses by default -- every run failed at negotiation. Mirrors the
  # sibling ge_mri_22_1.sh, whose systems acquire normally on this same
  # equipment family. Verified against 10.47.17.143 and 10.47.20.62: without
  # these, "no matching host key type found"; with them, negotiation completes.
  -o HostKeyAlgorithms=+ssh-rsa
  -o PubkeyAcceptedAlgorithms=+ssh-rsa
  -o ConnectTimeout=10
  -o ServerAliveInterval=10
  -o ServerAliveCountMax=6
)

# Get the remote file list. The ssh exit status is checked SEPARATELY from the
# banner-noise filtering. BUG-021: the old form piped ssh straight into grep
# and ended the substitution with `|| true`, then treated an empty result as
# "no new files" and exited 0 -- so ANY failure (auth, network, host key) was
# reported to the caller as a SUCCESSFUL acquisition. That hid a total
# connection failure on two systems for every run in the retained history
# while alert.offline_hhm_conn showed them green with a current timestamp.
ssh_rc=0
raw_list="$(
  timeout 240 sshpass -e ssh "${SSH_OPTS[@]}" "$user@$host" \
    "/bin/sh -c 'for f in /usr/g/service/log/gesys*.log; do [ -f \"\$f\" ] && echo \"\$f\"; done'"
)" || ssh_rc=$?

if [[ $ssh_rc -ne 0 ]]; then
  # stderr already carries the real reason and flows to the caller, whose
  # connection_regex.js classifies it (e.g. "Unable to negotiate ..." ->
  # key_exchange, manual_intervention). Exiting non-zero is what lets it be
  # classified at all.
  echo "ssh file-list failed (rc=$ssh_rc)" >&2
  exit "$ssh_rc"
fi

# Banner noise is FILTERED here -- finding nothing is not a failure, but it is
# now only reachable on a connection that actually succeeded.
file_list="$(
  printf '%s\n' "$raw_list" \
  | tr -d '\r' \
  | grep -E '^/usr/g/service/log/gesys.*\.log$' \
  || true
)"

if [[ -z "${file_list//$'\n'/}" ]]; then
  echo "Connected; no matching files on the remote." >&2
  exit 0
fi

echo "File list:"
echo "$file_list"

errors=0
while IFS= read -r remote_file; do
  [[ -z "$remote_file" ]] && continue

  base="$(basename "$remote_file")"
  tmp="$dest/$base.tmp"
  out="$dest/$base"

  echo "Downloading $remote_file -> $out"

  if timeout 240 sshpass -e ssh "${SSH_OPTS[@]}" "$user@$host" \
    "/bin/sh -c 'cat \"$remote_file\"'" < /dev/null \
    | sed '/^DICTIONARYDIR is not set/d;
           /^ODINA_DICTIONARY is not set/d;
           /^DICOM_DICTIONARY is not set/d;
           /can'\''t set the locale/d;
           /^chown: /d;
           /BrainWave\.config: Permission denied/d;
           /^\/usr\/ucb\/tset/d;
           /^?$/d' \
    > "$tmp"
  then
    mv -f "$tmp" "$out"
  else
    echo "WARNING: Failed to download $remote_file" >&2
    rm -f "$tmp"
    errors=$((errors + 1))
  fi
done <<< "$file_list"

if [[ $errors -gt 0 ]]; then
  echo "$errors file(s) failed to download." >&2
  exit 1
fi
