#!/usr/bin/expect -f

set ip_address "10.0.107.10"
set username "service"
set password "4rhelp"
set password2 "operator"

# $1: ip_address

spawn telnet $ip_address

expect "GEMR3T login:"
send "$username\r"

expect "Password:"
send "$password\r"

send "su -\r"
expect "Password:"
send "$password2\r"

send "iptables -L\r"
expect -re "GEMR3T /root.*"

# Send the command "ls -l | grep 'bclass_msg'" and wait for the prompt again
# send "ls -l | grep 'bclass_msg'\r"
# expect -re "drw.*"  ;  # Adjust this to match the prompt you expect

# Capture and print the output of the command
# set result $expect_out(buffer)
# puts $result

# Exit the Expect script
# exit
# ftp from windows to linux