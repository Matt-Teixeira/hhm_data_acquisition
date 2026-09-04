#!/usr/bin/expect -f
# GE MRI acquisition via ssh+tar, driven by expect for password auth.
#
# argv: host user <placeholder> local_path
#   SEC-004: the password arrives via the SSHPASS environment variable, never
#   argv (where it was readable in /proc/*/cmdline for the life of the run).
#   $argv[2] stays a positional placeholder until every family is converted.
if { ![info exists env(SSHPASS)] || $env(SSHPASS) eq "" } {
    puts stderr "SSHPASS must be set by the caller"
    exit 1
}
set host         [lindex $argv 0]
set user         [lindex $argv 1]
set password     $env(SSHPASS)
set local_path   [lindex $argv 3]
set remote_path  "/usr/g/service/log"
set file_pattern "gesys*.log"

if { ! [file isdirectory $local_path] } {
    file mkdir $local_path
}

# BUG-022: the coreutils `timeout 240` is the real bound and yields rc 124 on
# expiry. expect's own timer must sit ABOVE it so it never clips a slow but
# live transfer -- the old 45s did exactly that, then exited 0.
set timeout 250

# -F /opt/resources/ssh/config: strict host-key checking against the shared
#   bundle (this family's hosts are pre-verified present). Replaces the
#   previous NO setting at all, which made ssh fall back to =ask and sit at
#   "Are you sure you want to continue connecting?" until the timer expired.
# -o BatchMode=no: overrides the config's BatchMode=yes so keyboard-interactive
#   password auth still works (that is the whole point of using expect).
# PIPESTATUS: a bare pipeline's status is tar's, which is 0 when ssh dies
#   before producing any output -- the core of the masking. Prefer ssh's own
#   status when it failed (255 = ssh, 124 = timeout) so the run record says
#   WHAT failed, and fall back to tar's otherwise.
spawn timeout 240 bash -c "ssh -F /opt/resources/ssh/config -o BatchMode=no -oKexAlgorithms=diffie-hellman-group14-sha1 -oMACs=hmac-sha2-256 -oConnectTimeout=10 -oServerAliveInterval=10 -oServerAliveCountMax=6 $user@$host 'cd $remote_path && tar -cf - $file_pattern' | tar -xf - -C $local_path; st=(\${PIPESTATUS\[@\]}); if \[ \${st\[0\]} -ne 0 \]; then exit \${st\[0\]}; else exit \${st\[1\]}; fi"

expect {
    "*assword:*" {
        send "$password\r"
        exp_continue
    }
    -re "continue connecting|authenticity of host" {
        # Should be unreachable under strict checking with a known key. Kept
        # as a tripwire: never answer it, never sit on it. The prompt text
        # itself reaches the caller via stdout and is classified there.
        puts stderr "ssh asked to confirm an unknown host key; refusing"
        exit 3
    }
    timeout {
        puts stderr "expect timed out waiting for ssh/tar to finish"
        exit 124
    }
    eof
}

# Propagate the child's exit status. Falling off the end of the script exited
# 0 regardless of what ssh did -- which is what recorded a total connection
# failure as a successful acquisition (BUG-021's sibling).
if { [catch {wait} result] } {
    puts stderr "wait failed: $result"
    exit 1
}
if { [lindex $result 2] != 0 } {
    puts stderr "wait: OS error [lindex $result 3]"
    exit 1
}
exit [lindex $result 3]
