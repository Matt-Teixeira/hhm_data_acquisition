# 55 07,15 * * * cd /home/matt-teixeira/hep3/hhm_data_acquisition/read/sh &&  expect telnet_ip_tables.sh 10.0.107.10 service 4rhelp operator
#!/usr/bin/expect -f

set ip_address [lindex $argv 0]
set username [lindex $argv 1]
set password [lindex $argv 2]
set password2 [lindex $argv 3]

spawn telnet $ip_address

sleep 2

expect ".* login:"
send "$username\r"
sleep 1
expect "Password:"
send "$password\r"
sleep 1
send "su -\r"
sleep 1
expect "Password:"
send "$password2\r"
sleep 1

expect -re ".*\#"
send "iptables -A PNF_DYN -p tcp --dport 22 -j ACCEPT\r"
sleep 1
send "logout\r"