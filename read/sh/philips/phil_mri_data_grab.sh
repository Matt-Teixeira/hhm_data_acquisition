[ ! -d "/home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4" ] && mkdir /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4
# { PHILIPS MRI
# ----------------------------------------------------------------------------------------
# - name: Philips MR (SCP/All)
mkdir -p /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4/rmmu_long
mkdir -p /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4/rmmu_short
mkdir -p /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4/rmmu_magnet
mkdir -p /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4/monitoring
# - name: Philips MR (SCP, default credentials)
timeout 120 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new $2@$1:/cygdrive/g/Log/logcurrent.log /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4
timeout 120 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new $2@$1:/cygdrive/g/Log/rmmu* /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4/rmmu_long
timeout 120 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new $2@$1:/cygdrive/g/Site/rmmu* /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4/rmmu_long
timeout 120 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new $2@$1:/cygdrive/g/Site/monitor_* /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4/monitoring
timeout 120 sshpass -p $3 scp -o StrictHostKeyChecking=accept-new $2@$1:/cygdrive/g/monitoring/monitor_* /home/matt-teixeira/hep3/hhm_data_acquisition/test_hhm/Philips/MRI/$4/monitoring

