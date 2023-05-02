// TODO: CONVERT TO SET

const regexTags = {
   // MM3
   RE_GE_MM3: new RegExp(
      /(?<host_date>[\d]{2}-[\w]+-[\d]+),\s(?<host_time>[\d]{2}:[\d]{2}),\s+(?<he_level_value>[\d\.]+),\s+(?<water_flow_value>[\d\.]+),\s+(?<water_temp_value>[\d\.-]+),\s+(?<shield_si410_value>[\d\.]+),\s+(?<recon_ruo_value>[\d\.]+),\s+(?<recon_si410_value>[\d\.]+),\s+(?<coldhead_ruo_value>[\d\.]+),\s+(?<he_pressure_value>[\d\.-]+),\s+[\d\.]+,\s+[\d\.]+,\s+(?<cdc1_value>[\d\.]+)/,
      'g'
   ),
   // MM3_PROFILE_A
   RE_GE_MM3_A: new RegExp(
      /(?<host_date>\d{2}-[\w]{3}-\d{2}), +(?<host_time>\d{2}:\d{2}), +(?<he_level_value>[\d-]+\.[\d]{2}), +(?<water_flow_value>[\d-]+\.[\d]{3}), +(?<water_temp_value>[\d-]+\.[\d]{3}), +(?<shield_si410_value>[\d-]+\.[\d]{3}), +(?<recon_ruo_value>[\d-]+\.[\d]{3}), +(?<recon_si410_value>[\d-]+\.[\d]{3}), +(?<coldhead_ruo_value>[\d-]+\.[\d]{3}), +(?<he_pressure_value>[\d-]+\.[\d]{3}), +(?<cs1_value>[\d]+), +(?<cdc1_value>[\d]+), +(?<ht_value>[\d]+), +(?<hdc_value>[\d]+), +(?<rf_value>[\d]+), +(?<fm_value>[\d]+), +(?<sm_value>[\d]+), +(?<ec1_value>[\d]+), +(?<ec2_value>[\d]+), +(?<ec3_value>[\d]+), +(?<ec4_value>[\d]+)/,
      'g'
   ),
   // MM3_PROFILE_B
   RE_GE_MM3_B: new RegExp(
      /(?<host_date>\d{2}-[\w]{3}-\d{2}), +(?<host_time>\d{2}:\d{2}), +(?<he_level_value>[\d-]+\.[\d]{2}), +(?<water_flow_value>[\d-]+\.[\d]{3}), +(?<water_temp_value>[\d-]+\.[\d]{3}), +(?<shield_si410_value>[\d-]+\.[\d]{3}), +(?<recon_ruo_value>[\d-]+\.[\d]{3}), +(?<recon_si410_value>[\d-]+\.[\d]{3}), +(?<coldhead_ruo_value>[\d-]+\.[\d]{3}), +(?<he_pressure_value>[\d-]+\.[\d]{3}), +(?<sc_pressure_value>[\d-]+\.[\d]{3}), +(?<cs1_value>[\d]+), +(?<cdc1_value>[\d]+), +(?<ht_value>[\d]+), +(?<hdc_value>[\d]+), +(?<rf_value>[\d]+), +(?<fm_value>[\d]+), +(?<sm_value>[\d]+), +(?<ec1_value>[\d]+), +(?<ec2_value>[\d]+), +(?<ec3_value>[\d]+), +(?<ec4_value>[\d]+)/,
      'g'
   ),
   // MM3_PROFILE_C
   RE_GE_MM3_C: new RegExp(
      /(?<host_date>\d{2}-[\w]{3}-\d{2}), +(?<host_time>\d{2}:\d{2}), +(?<he_level_value>[\d-]+\.[\d]{2}), +(?<water_flow_value>[\d-]+\.[\d]{3}), +(?<water_temp_value>[\d-]+\.[\d]{3}), +(?<shield_si410_value>[\d-]+\.[\d]{3}), +(?<recon_ruo_value>[\d-]+\.[\d]{3}), +(?<recon_si410_value>[\d-]+\.[\d]{3}), +(?<coldhead_ruo_value>[\d-]+\.[\d]{3}), +(?<he_pressure_value>[\d-]+\.[\d]{3}), +(?<cmp1a_value>[\d-]+\.[\d]{3}), +(?<cs1_value>[\d]+), +(?<cdc1_value>[\d]+), +(?<ht_value>[\d]+), +(?<hdc_value>[\d]+), +(?<rf_value>[\d]+), +(?<fm_value>[\d]+), +(?<sm_value>[\d]+), +(?<ec1_value>[\d]+), +(?<ec2_value>[\d]+), +(?<ec3_value>[\d]+), +(?<ec4_value>[\d]+)/,
      'g'
   ),
   // MM3_PROFILE_D
   RE_GE_MM3_D: new RegExp(
      /(?<host_date>\d{2}-[\w]{3}-\d{2}), +(?<host_time>\d{2}:\d{2}), +(?<he_level_value>[\d-]+\.[\d]{2}), +(?<water_flow_value>[\d-]+\.[\d]{3}), +(?<water_flow_2_value>[\d-]+\.[\d]{3}), +(?<water_temp_value>[\d-]+\.[\d]{3}), +(?<water_temp_2_value>[\d-]+\.[\d]{3}), +(?<shield_si410_value>[\d-]+\.[\d]{3}), +(?<recon_ruo_value>[\d-]+\.[\d]{3}), +(?<recon_si410_value>[\d-]+\.[\d]{3}), +(?<coldhead_ruo_value>[\d-]+\.[\d]{3}), +(?<he_pressure_value>[\d-]+\.[\d]{3}), +(?<cs1_value>[\d]+), +(?<cdc1_value>[\d]+), +(?<cs2_value>[\d]+), +(?<cdc2_value>[\d]+), +(?<ht_value>[\d]+), +(?<hdc_value>[\d]+), +(?<rf_value>[\d]+), +(?<fm_value>[\d]+), +(?<sm_value>[\d]+), +(?<ec1_value>[\d]+), +(?<ec2_value>[\d]+), +(?<ec3_value>[\d]+), +(?<ec4_value>[\d]+)/,
      'g'
   ),
   // MM3_PROFILE_E
   RE_GE_MM3_E: new RegExp(
      /(?<host_date>\d{2}-[\w]{3}-\d{2}), +(?<host_time>\d{2}:\d{2}), +(?<he_level_value>[\d-]+\.[\d]{2}), +(?<water_flow_value>[\d-]+\.[\d]{3}), +(?<water_temp_value>[\d-]+\.[\d]{3}), +(?<shield_si410_value>[\d-]+\.[\d]{3}), +(?<recon_si410_value>[\d-]+\.[\d]{3}), +(?<he_pressure_value>[\d-]+\.[\d]{3}), +(?<cs1_value>[\d]+), +(?<cdc1_value>[\d]+), +(?<ht_value>[\d]+), +(?<hdc_value>[\d]+), +(?<rf_value>[\d]+), +(?<fm_value>[\d]+), +(?<sm_value>[\d]+), +(?<ec1_value>[\d]+), +(?<ec2_value>[\d]+), +(?<ec3_value>[\d]+), +(?<ec4_value>[\d]+)/,
      'g'
   ),
   // MM4
   RE_GE_MM4: new RegExp(
      /(?<host_date>[\d]{6}) +(?<host_time>[\d]{4}) +(?<he_level_value>[-\d\.]+) +(?<water_flow_value>[-\d\.]+) +(?<water_temp_value>[-\d\.]+) +(?<shield_si410_value>[-\d\.]+) +(?<recon_ruo_value>[-\d\.]+) +(?<recon_si410_value>[-\d\.]+) +(?<coldhead_ruo_value>[-\d\.]+) +(?<he_pressure_value>[-\d\.]+) +[-\d\.]+ +[-\d\.]+ +[-\d\.]+ +[-\d\.]+ +[-\d\.]+ +[-\d\.]+ +[-\d\.]+ +[-\d\.]+ +(?<case_temp_value>[-\d\.]+) +[-\d\.]+ +(?<cdc1_value>[-\d\.]+)/,
      'g'
   ),
   // SIEMENS
   RE_SIEMENS_MSUP_META: new RegExp(
      /Magnet Supervisory +"(?<msup_metadata>.*)"\n/,
      'g'
   ),
   RE_SIEMENS_OR_CODE: new RegExp(
      /(?<or_dash_code>[\w]{2}[\d-]{4,6}) (?<or_code>[\d]{4})/,
      'g'
   ),
   // RE_SIEMENS_OR_CODE: new RegExp(
   //    /OR(?<or_dash_code>[\d-]{4,6}) (?<or_code>[\d]{4})/,
   //    'g'
   // ),
   RE_SIEMENS_FIELD_CURRENT: new RegExp(
      /Field current (?<field_current_value>[\d\.]+)(?<field_current_units>\w)/,
      'g'
   ),
   RE_SIEMENS_HOST_TIME_DATE: new RegExp(
      /(?<host_time>[\d]{2}:[\d]{2}:[\d]{2}) (?<host_date>[\d]{2}-[\w]+-[\d]+)/,
      'g'
   ),
   RE_SIEMENS_SUP_TIME: new RegExp(
      /Supervisory Time: (?<sup_time>\d{2}:\d{2}:\d{2})/,
      'g'
   ),
   RE_SIEMENS_TEST_TIME: new RegExp(
      /Test Time(?<test_time>\d{2}:\d{2}:\d{2})/,
      'g'
   ),
   RE_SIEMENS_LVQD: new RegExp(/LVQD: (?<lvqd>.*)\n/, 'g'),
   RE_SIEMENS_MSUP: new RegExp(
      /MSUP S\/N (?<msup_sn>[\d]+)[\d]+ Rev (?<msup_rev>[\d]+)/,
      'g'
   ),
   RE_SIEMENS_MAG_SN: new RegExp(/Magnet S\/N (?<magnet_sn>[\d]+)/, 'g'),
   RE_SIEMENS_MAG_REV: new RegExp(/Magnet.*Rev (?<magnet_rev>[\d]{4})/, 'g'),
   RE_SIEMENS_HE_PARAMS: new RegExp(/He Parameters +(?<he_params>.*)\n/, 'g'),
   // PROCESSING PATTENS
   // RE_SIEMENS_HE_VALUES_PER: new RegExp(
   //    /Values +(?<he_param_1_value>[\de]+) +(?<he_param_2_value>[\de]+) +(?<he_alarm_low_value>[\d]{2}) +(?<he_alarm_high_value>[\d]{2}) +(?<he_warn_low_value>[\d]{2}) +(?<he_warn_high_value>[\d]{2}) +(?<he_level_1_value>[\d.S\/C]+)%?(?: +(?<he_level_2_value>[\d.S\/C]+)?%?)?/,
   //    'g'
   // ),
   // RE_SIEMENS_HE_VALUES_LTS: new RegExp(
   //    /Values\s+(?<he_param_1_value>[\d]+)\s+(?<he_param_2_value>[\d]+)\s+(?<he_alarm_low_value>[\d]{4})\s+(?<he_alarm_high_value>[\d]{4})\s+(?<he_warn_low_value>[\d]{4})\s+(?<he_warn_high_value>[\d]{4})\s+(?<he_level_1_value>[\d]{4})/,
   //    'g'
   // ),
   RE_SIEMENS_HE_VALUES_UNIFIED: new RegExp(
      /Values +(?<he_param_1>\d+) +(?<he_param_2>\d+) +(?<he_alarm_low_value>\d+) (?<he_alarm_high_value>\d+) +(?<he_warn_low_value>\d+) (?<he_warn_high_value>\d+) +(?<he_level_1_value>[\d\.]+)%?(?: +(?<he_level_2_value>[\d\.]+)?%)?/,
      'g'
   ),
   // PROCESSING PATTERNS
   RE_SIEMENS_HE_STATUS: new RegExp(/He: (?<he_status>.+?)(?= {2})/, 'g'),
   RE_SIEMENS_EIS_STATUS: new RegExp(/EIS: (?<eis_status>.*)\n/, 'g'),
   RE_SIEMENS_FIELD: new RegExp(/Field: (?<field>.+?)(?= {2})/, 'g'),
   RE_SIEMENS_SELF_TEST: new RegExp(
      /Self Test: (?<self_test_result>.*)\n/,
      'g'
   ),
   RE_SIEMENS_BATTERY_STATUS: new RegExp(
      /Battery: (?<battery_status>.+?)(?= {2})/,
      'g'
   ),
   RE_SIEMENS_SH_STATUS: new RegExp(/SH: (?<sh_status>.*)\n/, 'g'),
   RE_SIEMENS_BATTERY_VOLTS: new RegExp(
      /Volts:? +(?<battery_volts_value>[\d\.]+)/,
      'g'
   ),
   RE_SIEMENS_PRESS_HTR: new RegExp(
      /Press HTR: (?<press_htr_status>ON|OFF)(?: (?<press_htr_value>\d+)(?<press_htr_units>%))?/,
      'g'
   ),
   RE_SIEMENS_COMPRESSOR_STATUS: new RegExp(
      /Compressor: ?(?<compressor_status>ON|OFF)/,
      'g'
   ),
   RE_SIEMENS_COMPRESSOR_VALUE: new RegExp(
      /Compressor:\D+(?<compressor_value>[\d\.]+) ?(?<compressor_units>V|bar)/,
      'g'
   ),
   RE_SIEMENS_PRESS_SW_STATUS: new RegExp(
      /PRESS SW (?<press_sw_status>.*)\n/,
      'g'
   ),
   RE_SIEMENS_COLDHEAD: new RegExp(
      /Cold\sHead\s+Sensor[\d]?:(?<cold_head_sensor_1_value>[\d\.]+)(?<cold_head_sensor_1_units>K)(?:\s+(?<cold_head_status>OK|ALARM))?\n/,
      'g'
   ),
   RE_SIEMENS_SHIELD_SENSOR: new RegExp(
      /Shield +Sensor1:(?<shield_sensor_1_value>[\d\.]+)(?<shield_sensor_1_units>\w) +Sensor2:(?<shield_sensor_2_value>[\d\.]+)(?<shield_sensor_2_units>\w) +(?<shield_status>OK|WARN|ALARM)\n/,
      'g'
   ),
   RE_SIEMENS_SHIELD_LINK_BORE: new RegExp(
      /Shield +Link:(?<shield_link_value>[\d\.]+)(?<shield_link_units>\w) +Bore:(?<shield_bore_value>[\d\.]+)(?<shield_bore_units>\w) +(?<shield_status>OK|WARN|ALARM)\n/,
      'g'
   ),
   RE_SIEMENS_TURRET: new RegExp(
      /Turret +Sensor1:(?<turret_sensor_1_value>[\d\.]+)(?<turret_sensor_1_units>\w) +Sensor2:(?<turret_sensor_2_value>[\d\.]+)(?<turret_sensor_2_units>\w) +(?<turret_status>OK|ALARM)\n/,
      'g'
   ),
   RE_SIEMENS_CARBON_R_S1_S2: new RegExp(
      /Carbon R +Sensor1:(?<carbon_r_sensor_1_value>[\d\.]+)(?<carbon_r_sensor_1_units>\w) +Sensor2:(?<carbon_r_sensor_2_value>[\d\.]+)(?<carbon_r_sensor_2_units>\w) +(?<carbon_r_1_2_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_CARBON_R_S3_S4: new RegExp(
      /Carbon R +Sensor3:(?<carbon_r_sensor_3_value>[\d\.]+)(?<carbon_r_sensor_3_units>\w) +Sensor4:(?<carbon_r_sensor_4_value>[\d\.]+)(?<carbon_r_sensor_4_units>\w) +(?<carbon_r_3_4_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_CCR_S1_S2: new RegExp(
      /CCR +Sensor1:(?<ccr_sensor_1_value>[\d\.]+)(?<ccr_sensor_1_units>\w) +Sensor2:(?<ccr_sensor_2_value>[\d\.]+)(?<ccr_sensor_2_units>\w)(?: +(?<ccr_1_2_status>OK|ALARM))?/,
      'g'
   ),
   RE_SIEMENS_CCR_S3_S4: new RegExp(
      /CCR +Sensor3:(?<ccr_sensor_3_value>[\d\.]+)(?<ccr_sensor_3_units>\w) +Sensor4:(?<ccr_sensor_4_value>[\d\.]+)(?<ccr_sensor_4_units>\w)(?: +(?<ccr_3_4_status>OK|ALARM))?/,
      'g'
   ),
   RE_SIEMENS_SWT_HTR: new RegExp(
      /SwtHtr +Res1:(?<swt_htr_res_1_value>[\d\.]+)(?<swt_htr_res_1_units>\w) +(?<swt_htr_res_1_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_QUH_HTR: new RegExp(
      /QuhHtr +Res1:(?<quh_htr_res_1_value>[\d\.]+)(?<quh_htr_res_1_units>\w) +Res2:(?<quh_htr_res_2_value>[\d\.]+)(?<quh_htr_res_2_units>\w) +(?<quh_htr_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_MAG_PSI_A: new RegExp(
      /Mag psiA +:(?<mag_psia_value>[\d\.]+) +(?<mag_psia_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_AVG_PWR: new RegExp(
      /Average Power +:(?<avg_power_value>[\d\.]+)(?<avg_power_units>\w).*(?<avg_power_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_EPM: new RegExp(/EPM (?<epm_status>ON|OFF)/, 'g'),
   RE_SIEMENS_ERDU_STATUS: new RegExp(
      /ERDU[\D].*?(?<erdu_status>OK|FAULT|ALARM)/,
      'g'
   ),
   RE_SIEMENS_ERDU_BUTTONS: new RegExp(
      /Buttons: (?<erdu_buttons_value>[\d\.]+)/,
      'g'
   ),
   RE_SIEMENS_ERDU_STATUS_ARRAY: new RegExp(
      /ERDU1:(?<erdu_1_status>OK|OPEN|ALARM)? +ERDU2:(?<erdu_2_status>OK|OPEN|ALARM)? +ERDU3:(?<erdu_3_status>OK|OPEN|ALARM)?/,
      'g'
   ),
   RE_SIEMENS_TESTS: new RegExp(/Tests:(?<tests>.*)\n/, 'g'),
   RE_SIEMENS_I_BTN: new RegExp(
      /Ibutton\sSerial:\s(?<ibutton_sn>[\w\d]+)/,
      'g'
   ),
   // SIEMENS - NON TIM
   RE_SIEMENS_NT_MSUP_META: new RegExp(
      /Platform Magnet Supervisory +"(?<msup_metadata>.*)"/,
      'g'
   ),
   RE_SIEMENS_NT_RX: new RegExp(
      /[Rr]x: (?<rx>last command received|[\d\w]{2} [\d\w]{2} [\d\w]{2} [\d\w]{2} [\d\w]{2} [\d\w]{2} [\d\w]{2} [\d\w]{2})/,
      'g'
   ),
   RE_SIEMENS_NT_HOST_TIME_DATE: new RegExp(
      /(?<host_time>[\d]{2}:[\d]{2}:[\d]{2}) (?<host_date>[\d]{2}-[\w]+-[\d]+)/,
      'g'
   ),
   RE_SIEMENS_NT_TX: new RegExp(
      /[Tt]x: (?<tx>last command transmitted|[\d\w]{2} [\d\w]{2} [\d\w]{2} [\d\w]{2})/,
      'g'
   ),
   RE_SIEMENS_NT_HE_PARAMS: new RegExp(/He Parameters +(?<he_params>.*)/, 'g'),
   // PROCESSING PATTERN
   RE_SIEMENS_NT_HE_VALUES_PER: new RegExp(
      /Values +(?<he_param_1>[\d\w]+) +(?<he_param_2>[\d\w]+) +(?<he_alarm_low_value>[\d]+) (?<he_alarm_high_value>[\d]+) +(?<he_warn_low_value>[\d]+) (?<he_warn_high_value>[\d]+) +(?<he_level_1_value>[\d\.]+)/,
      'g'
   ),
   // PROCESSING PATTERN
   RE_SIEMENS_NT_OUT_MEASURE_STATUS: new RegExp(
      /NOUT_MEASURE_(?<out_measure_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS: new RegExp(
      /System: NIN_MSG_SYS(?<sys_in_msg_sys_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_SYS_PWR_FAIL: new RegExp(
      /PWR_FAIL +(?<sys_pwr_fail>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS: new RegExp(
      /NOUT_ERDU_BAT(?<bat_out_erdu_bat_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS: new RegExp(
      /Shield: +NOUT_FRIDGE_(?<shield_out_fridge_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_SHIELD_TEMP: new RegExp(
      /Shield.*\n.*Temp: (?<shield_temp_value>[\d]+)(?<shield_temp_units>\w)/,
      'g'
   ),
   RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM: new RegExp(
      /Alarm >(?<shield_fridge_alarm_value>\d+) +NOUT_FRIDGE_ALARM/,
      'g'
   ),
   RE_SIEMENS_NT_SHIELD_FRIDGE_WARN: new RegExp(
      /Warn +>(?<shield_fridge_warn_value>\d+) +NOUT_FRIDGE_WARN/,
      'g'
   ),
   RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS: new RegExp(
      /EMG Rundown:NIN_MSG_HTR(?<emg_rd_in_msg_htr_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS: new RegExp(
      /SCRU: +NOUT_EIS_(?<scru_out_eis_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS: new RegExp(
      /NIN_MSG_EIS(?<scru_in_msg_eis_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_IN_MSG_SWIT_STATUS: new RegExp(
      /NIN_MSG_SWIT(?<in_msg_switch_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS: new RegExp(
      /CCA Cabinet: NOUT_AIR_CON_(?<cca_cab_out_air_con_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_CCA_CAB_TEMPS: new RegExp(
      /CCA Cabinet:.*\n.*Temp: (?<cca_cab_temp_value>[-\d\.]+) +Alarm >(?<cca_cab_temp_alarm_value>[\d]+) Warn >(?<cca_cab_temp_warn_value>[\d]+)/,
      'g'
   ),
   RE_SIEMENS_NT_GPA_CAB_TEMPS: new RegExp(
      /GPA Cabinet:.*\n.*Temp: (?<gpa_cab_temp_value>[-\d\.]+) +Alarm >(?<gpa_cab_temp_alarm_value>[\d]+) Warn >(?<gpa_cab_temp_warn_value>[\d]+)/,
      'g'
   ),
   RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS: new RegExp(
      /NIN_MSG_FRIG_(?<tests_in_mgs_fridge_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS: new RegExp(
      /NIN_MSG_ALARM(?<tests_in_mgs_alarm_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS: new RegExp(
      /NIN_ERDU_LOAD(?<tests_in_erdu_load_status>\w+)/,
      'g'
   ),
   RE_SIEMENS_NT_SHIM_1: new RegExp(
      /1.\s+(?<shim_1_amps_value>[\d\.]+)\s+(?<shim_1_volts_value>[\d\.]+)\s+(?<shim_1_power_value>[\d]+)\s+(?<shim_1_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_NT_SHIM_2: new RegExp(
      /2.\s+(?<shim_2_amps_value>[\d\.]+)\s+(?<shim_2_volts_value>[\d\.]+)\s+(?<shim_2_power_value>[\d]+)\s+(?<shim_2_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_NT_SHIM_3: new RegExp(
      /3.\s+(?<shim_3_amps_value>[\d\.]+)\s+(?<shim_3_volts_value>[\d\.]+)\s+(?<shim_3_power_value>[\d]+)\s+(?<shim_3_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_NT_SHIM_4: new RegExp(
      /4.\s+(?<shim_4_amps_value>[\d\.]+)\s+(?<shim_4_volts_value>[\d\.]+)\s+(?<shim_4_power_value>[\d]+)\s+(?<shim_4_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_NT_SHIM_5: new RegExp(
      /5.\s+(?<shim_5_amps_value>[\d\.]+)\s+(?<shim_5_volts_value>[\d\.]+)\s+(?<shim_5_power_value>[\d]+)\s+(?<shim_5_status>OK|ALARM)/,
      'g'
   ),
   RE_SIEMENS_NT_DC_W: new RegExp(
      /DC:(?<dc_value>[\d\.]+)\w +(?<watts_value>\d+)(?<watts_units>\w)/,
      'g'
   ),
   // REMOVING TO SIMPLY MIGRATION -> WILL RE-INSTATE POST NEXT DB TABLE LAYOUT REFACTOR
   // RE_SIEMENS_NT_DC_W: new RegExp(
   //    /DC:(?<dc_value>[\d\.]+)(?<dc_units>\w) +(?<watts_value>\d+)(?<watts_units>\w)/,
   //    'g'
   // ),
   // EDU2
   RE_EDU2_TEMP_PROBE_TEMPS: new RegExp(
      /(?:index\s0)\)\sis: (?<temp_probe_0_value>[-\d.]+)\n.*(?:index\s1)\)\sis: (?<temp_probe_1_value>[-\d.]+)/,
      'g'
   ),
   RE_EDU2_COMP_VIB: new RegExp(
      /COMPRESSOR\sVIBRATION\n(?<comp_vib_status>0|1)/,
      'g'
   ),
   RE_EDU2_ROOM_PROBE_HUM_TEMP: new RegExp(
      /Humidity: (?<room_humidity_value>[\d\.]+)%\nTemp: (?<room_temp_value>[\d\.]+)\sFarenheit/,
      'g'
   ),
   // EDU - MAY NEED TO ADD THESE, MAYBE NOT
};

module.exports = regexTags;
