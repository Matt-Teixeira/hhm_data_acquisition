SME15819;
SME10571;
SME01422;

SME11246 = {
  ssh: {
    host: "SME11246",
    user_id: "avante",
    ip_address: "172.31.0.12"
  },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};

SME15812 = {
  ssh: { host: "SME15812", user_id: "avante", ip_address: "172.31.3.38" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};

SME15815 = {
  ssh: { host: "SME15815", user_id: "avante", ip_address: "172.31.0.19" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};

SME15820 = {
  ssh: { host: "SME15820", user_id: "avante", ip_address: "172.31.3.47" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};

SME10255 = {
  ssh: { host: "SME10255", user_id: "avante", ip_address: "25.48.16.48" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    }
  ]
};

SME01897 = {
  ssh: { host: "SME01897", user_id: "avante", ip_address: "172.31.2.19" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_D"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};

SME01107 = {
  ssh: { host: "SME01107", user_id: "avante", ip_address: "172.31.2.12" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_HE_VALUES_UNIFIED"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};

SME01890 = {
  ssh: { host: "SME01890", user_id: "avante", ip_address: "10.50.70.11" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};

SME01123 = {
  ssh: { host: "SME01123", user_id: "avante", ip_address: "172.31.2.35" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};

SME13572 = {
  ssh: { host: "SME13572", user_id: "jdis", ip_address: "25.76.110.154" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 1,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    }
  ]
};

SME12029 = {
  ssh: { host: "SME12029", user_id: "avante", ip_address: "172.31.2.41" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: ["RE_EDU2_ROOM_PROBE_HUM_TEMP"]
    }
  ]
};

SME12448 = {
  ssh: { host: "SME12448", user_id: "avante", ip_address: "172.31.2.24" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME13604 = {
  ssh: { host: "SME13604", user_id: "avante", ip_address: "172.31.3.30" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    }
  ]
};
SME15806 = {
  ssh: { host: "SME15806", user_id: "avante", ip_address: "172.31.0.23" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 5,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15819 = {
  ssh: { host: "SME15819", user_id: "avante", ip_address: "172.31.3.39" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15821 = {
  ssh: { host: "SME15821", user_id: "avante", ip_address: "172.31.3.53" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10252 = {
  ssh: { host: "SME10252", user_id: "jdis", ip_address: "25.64.183.151" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    }
  ]
};
SME10259 = {
  ssh: { host: "SME10259", user_id: "avante", ip_address: "172.31.0.11" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "edu.v1",
      schedule: 6,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME15813 = {
  ssh: { host: "SME15813", user_id: "avante", ip_address: "172.31.0.28" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01118 = {
  ssh: { host: "SME01118", user_id: "avante", ip_address: "172.31.2.5" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 4,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_MSUP_META",
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15817 = {
  ssh: { host: "SME15817", user_id: "avante", ip_address: "172.31.3.48" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10571 = {
  ssh: { host: "SME10571", user_id: "avante", ip_address: "172.31.2.27" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 0,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10260 = {
  ssh: { host: "SME10260", user_id: "avante", ip_address: "172.31.0.3" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "edu.v1",
      schedule: 7,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME10250 = {
  ssh: { host: "SME10250", user_id: "avante", ip_address: "172.31.0.6" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm4",
      schedule: 5,
      mmbScript: "v3_ge_mm4",
      regexModels: ["RE_GE_MM4"]
    },
    {
      pgTable: "edu.v1",
      schedule: 7,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME10253 = {
  ssh: { host: "SME10253", user_id: "jdis", ip_address: "25.36.19.157" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_B"]
    },
    {
      pgTable: "edu.v1",
      schedule: 6,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME10254 = {
  ssh: { host: "SME10254", user_id: "jdis", ip_address: "25.35.104.13" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_B"]
    }
  ]
};
SME01422 = {
  ssh: { host: "SME01422", user_id: "avante", ip_address: "172.31.3.11" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 0,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12452 = {
  ssh: { host: "SME12452", user_id: "avante", ip_address: "172.31.2.59" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12501 = {
  ssh: { host: "SME12501", user_id: "avante", ip_address: "216.99.223.119" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_C"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01872 = {
  ssh: { host: "SME01872", user_id: "avante", ip_address: "172.31.2.2" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01113 = {
  ssh: { host: "SME01113", user_id: "avante", ip_address: "172.31.2.9" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15263 = {
  ssh: { host: "SME15263", user_id: "avante", ip_address: "10.140.55.10" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01109 = {
  ssh: { host: "SME01109", user_id: "avante", ip_address: "172.31.2.11" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 3,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_HE_VALUES_UNIFIED"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12424 = {
  ssh: { host: "SME12424", user_id: "avante", ip_address: "167.171.115.91" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10262 = {
  ssh: { host: "SME10262", user_id: "avante", ip_address: "172.31.0.16" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_HE_VALUES_UNIFIED"
      ]
    },
    {
      pgTable: "edu.v1",
      schedule: 6,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME11247 = {
  ssh: { host: "SME11247", user_id: "avante", ip_address: "172.31.0.2" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME11248 = {
  ssh: { host: "SME11248", user_id: "avante", ip_address: "172.31.0.13" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10230 = {
  ssh: { host: "SME10230", user_id: "jdis", ip_address: "25.68.42.227" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "edu.v1",
      schedule: 7,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME11810 = {
  ssh: { host: "SME11810", user_id: "avante", ip_address: "172.23.68.7" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME02524 = {
  ssh: { host: "SME02524", user_id: "avante", ip_address: "172.18.41.23" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12416 = {
  ssh: { host: "SME12416", user_id: "avante", ip_address: "172.31.3.12" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME02583 = {
  ssh: { host: "SME02583", user_id: "avante", ip_address: "10.50.10.108" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12471 = {
  ssh: { host: "SME12471", user_id: "avante", ip_address: "170.232.104.217" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 3,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_MSUP_META",
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_HE_STATUS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    }
  ]
};
SME13577 = {
  ssh: { host: "SME13577", user_id: "jdis", ip_address: "25.5.128.124" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 1,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    }
  ]
};
SME12414 = {
  ssh: { host: "SME12414", user_id: "avante", ip_address: "167.171.166.178" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01121 = {
  ssh: { host: "SME01121", user_id: "avante", ip_address: "172.31.2.22" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_HE_VALUES_UNIFIED"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME02582 = {
  ssh: { host: "SME02582", user_id: "avante", ip_address: "172.31.2.25" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME14950 = {
  ssh: { host: "SME14950", user_id: "avante", ip_address: "172.31.0.26" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15800 = {
  ssh: { host: "SME15800", user_id: "avante", ip_address: "172.31.3.37" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15804 = {
  ssh: { host: "SME15804", user_id: "avante", ip_address: "172.31.3.35" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15807 = {
  ssh: { host: "SME15807", user_id: "avante", ip_address: "172.31.2.7" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME14209 = {
  ssh: { host: "SME14209", user_id: "avante", ip_address: "172.31.3.17" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 0,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME08722 = {
  ssh: { host: "SME08722", user_id: "avante", ip_address: "172.31.3.2" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm4",
      schedule: 2,
      mmbScript: "v2_ge_mm4",
      regexModels: ["RE_GE_MM4"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME08709 = {
  ssh: { host: "SME08709", user_id: "avante", ip_address: "172.31.2.30" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm4",
      schedule: 1,
      mmbScript: "v2_ge_mm4",
      regexModels: ["RE_GE_MM4"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01130 = {
  ssh: { host: "SME01130", user_id: "avante", ip_address: "172.31.2.28" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 3,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15809 = {
  ssh: { host: "SME15809", user_id: "avante", ip_address: "172.31.3.50" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12753 = {
  ssh: { host: "SME12753", user_id: "avante", ip_address: "172.31.2.38" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 0,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN",
        "RE_SIEMENS_TESTS"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 0,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME13571 = {
  ssh: { host: "SME13571", user_id: "jdis", ip_address: "25.75.232.63" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 2,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    }
  ]
};
SME10218 = {
  ssh: { host: "SME10218", user_id: "avante", ip_address: "10.9.230.237" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_HE_VALUES_UNIFIED"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10243 = {
  ssh: { host: "SME10243", user_id: "jdis", ip_address: "25.65.236.195" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "edu.v1",
      schedule: 6,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME01133 = {
  ssh: { host: "SME01133", user_id: "avante", ip_address: "172.31.3.4" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12152 = {
  ssh: { host: "SME12152", user_id: "avante", ip_address: "172.31.3.22" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_F"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10234 = {
  ssh: { host: "SME10234", user_id: "avante", ip_address: "10.141.164.217" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15816 = {
  ssh: { host: "SME15816", user_id: "avante", ip_address: "172.31.0.25" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01423 = {
  ssh: { host: "SME01423", user_id: "avante", ip_address: "172.31.3.10" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 0,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10244 = {
  ssh: { host: "SME10244", user_id: "avante", ip_address: "172.31.0.3" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "edu.v1",
      schedule: 7,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME15822 = {
  ssh: { host: "SME15822", user_id: "avante", ip_address: "172.31.3.55" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12368 = {
  ssh: { host: "SME12368", user_id: "avante", ip_address: "170.232.104.216" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 3,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_MSUP_META",
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_HE_STATUS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    }
  ]
};
SME10228 = {
  ssh: { host: "SME10228", user_id: "jdis", ip_address: "25.64.23.19" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_MSUP_META",
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    },
    {
      pgTable: "edu.v1",
      schedule: 6,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME15811 = {
  ssh: { host: "SME15811", user_id: "avante", ip_address: "172.31.3.49" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01386 = {
  ssh: { host: "SME01386", user_id: "avante", ip_address: "172.31.3.3" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 0,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15810 = {
  ssh: { host: "SME15810", user_id: "avante", ip_address: "172.31.3.34" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01880 = {
  ssh: { host: "SME01880", user_id: "avante", ip_address: "172.31.2.8" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01882 = {
  ssh: { host: "SME01882", user_id: "avante", ip_address: "172.31.2.43" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01893 = {
  ssh: { host: "SME01893", user_id: "avante", ip_address: "172.31.2.42" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10240 = {
  ssh: { host: "SME10240", user_id: "avante", ip_address: "172.31.0.4" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 3,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    },
    {
      pgTable: "edu.v1",
      schedule: 6,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME15823 = {
  ssh: { host: "SME15823", user_id: "avante", ip_address: "172.31.0.21" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15818 = {
  ssh: { host: "SME15818", user_id: "avante", ip_address: "172.31.3.40" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 5,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15802 = {
  ssh: { host: "SME15802", user_id: "avante", ip_address: "172.31.3.52" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15803 = {
  ssh: { host: "SME15803", user_id: "avante", ip_address: "172.31.3.32" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10246 = {
  ssh: { host: "SME10246", user_id: "avante", ip_address: "172.31.0.5" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_MSUP_META",
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    },
    {
      pgTable: "edu.v1",
      schedule: 6,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME10257 = {
  ssh: { host: "SME10257", user_id: "jdis", ip_address: "25.63.233.139" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "edu.v1",
      schedule: 7,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME13576 = {
  ssh: { host: "SME13576", user_id: "avante", ip_address: "172.31.3.21" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    }
  ]
};
SME13605 = {
  ssh: { host: "SME13605", user_id: "avante", ip_address: "172.31.3.29" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 0,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    }
  ]
};
SME15581 = {
  ssh: { host: "SME15581", user_id: "avante", ip_address: "172.31.3.62" }
};
SME13606 = {
  ssh: { host: "SME13606", user_id: "avante", ip_address: "172.31.0.15" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    }
  ]
};
SME10756 = {
  ssh: { host: "SME10756", user_id: "avante", ip_address: "172.31.3.24" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 5,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME13574 = {
  ssh: { host: "SME13574", user_id: "jdis", ip_address: "25.6.99.168" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 1,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    }
  ]
};
SME01125 = {
  ssh: { host: "SME01125", user_id: "avante", ip_address: "172.31.2.29" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 3,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_HE_VALUES_UNIFIED"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME13575 = {
  ssh: { host: "SME13575", user_id: "jdis", ip_address: "25.6.240.163" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 1,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    }
  ]
};
SME01895 = {
  ssh: { host: "SME01895", user_id: "avante", ip_address: "172.31.3.23" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_E"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12500 = {
  ssh: { host: "SME12500", user_id: "avante", ip_address: "216.99.223.117" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME13615 = {
  ssh: { host: "SME13615", user_id: "avante", ip_address: "172.31.3.9" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 5,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15166 = {
  ssh: { host: "SME15166", user_id: "avante", ip_address: "172.31.3.8" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_HE_VALUES_UNIFIED"
      ]
    }
  ]
};
SME10238 = {
  ssh: { host: "SME10238", user_id: "jdis", ip_address: "25.42.203.33" },
  rpp_configs: []
};
SME01096 = {
  ssh: { host: "SME01096", user_id: "avante", ip_address: "172.31.2.34" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15261 = {
  ssh: { host: "SME15261", user_id: "avante", ip_address: "10.140.54.111" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    }
  ]
};
SME15805 = {
  ssh: { host: "SME15805", user_id: "avante", ip_address: "172.31.3.51" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15262 = {
  ssh: { host: "SME15262", user_id: "avante", ip_address: "10.140.54.112" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    }
  ]
};
SME10844 = {
  ssh: { host: "SME10844", user_id: "avante", ip_address: "172.31.3.7" },
  rpp_configs: [
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10226 = {
  ssh: { host: "SME10226", user_id: "jdis", ip_address: "25.41.8.40" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    }
  ]
};
SME01867 = {
  ssh: { host: "SME01867", user_id: "avante", ip_address: "10.150.95.101" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15808 = {
  ssh: { host: "SME15808", user_id: "avante", ip_address: "172.31.0.27" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15814 = {
  ssh: { host: "SME15814", user_id: "avante", ip_address: "172.31.0.22" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME13607 = {
  ssh: { host: "SME13607", user_id: "avante", ip_address: "172.31.3.31" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 0,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    }
  ]
};
SME15799 = {
  ssh: { host: "SME15799", user_id: "avante", ip_address: "172.31.2.6" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME15801 = {
  ssh: { host: "SME15801", user_id: "avante", ip_address: "172.31.3.54" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01892 = {
  ssh: { host: "SME01892", user_id: "avante", ip_address: "172.31.2.15" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 3,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME02483 = {
  ssh: { host: "SME02483", user_id: "avante", ip_address: "172.31.2.20" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 0,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    }
  ]
};
SME11808 = {
  ssh: { host: "SME11808", user_id: "avante", ip_address: "10.3.10.146" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12083 = {
  ssh: { host: "SME12083", user_id: "avante", ip_address: "172.31.3.16" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm4",
      schedule: 4,
      mmbScript: "v2_ge_mm4",
      regexModels: ["RE_GE_MM4"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME14637 = {
  ssh: { host: "SME14637", user_id: "avante", ip_address: "172.31.2.60" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01140 = {
  ssh: { host: "SME01140", user_id: "avante", ip_address: "172.31.2.32" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12491 = {
  ssh: { host: "SME12491", user_id: "jdis", ip_address: "25.67.173.189" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    }
  ]
};
SME09782 = {
  ssh: { host: "SME09782", user_id: "avante", ip_address: "10.150.11.101" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_B"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01141 = {
  ssh: { host: "SME01141", user_id: "avante", ip_address: "172.31.2.33" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01097 = {
  ssh: { host: "SME01097", user_id: "avante", ip_address: "172.31.2.36" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_MSUP_META",
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01100 = {
  ssh: { host: "SME01100", user_id: "avante", ip_address: "172.31.2.37" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01115 = {
  ssh: { host: "SME01115", user_id: "avante", ip_address: "172.31.3.5" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12415 = {
  ssh: { host: "SME12415", user_id: "avante", ip_address: "172.31.3.14" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01111 = {
  ssh: { host: "SME01111", user_id: "avante", ip_address: "172.31.2.10" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 1,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10227 = {
  ssh: { host: "SME10227", user_id: "jdis", ip_address: "25.3.104.116" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 2,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    }
  ]
};
SME01873 = {
  ssh: { host: "SME01873", user_id: "avante", ip_address: "172.31.2.50" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 4,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME12489 = {
  ssh: { host: "SME12489", user_id: "jdis", ip_address: "25.53.232.214" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_A"]
    },
    {
      pgTable: "edu.v1",
      schedule: 7,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME10242 = {
  ssh: { host: "SME10242", user_id: "jdis", ip_address: "25.67.22.73" },
  rpp_configs: [
    {
      pgTable: "mmb_ge_mm3",
      schedule: 1,
      mmbScript: "v3_ge_mm3",
      regexModels: ["RE_GE_MM3_B"]
    },
    {
      pgTable: "edu.v1",
      schedule: 7,
      mmbScript: "v2_edu",
      regexModels: [
        "RE_EDU_ROOM_PROBE",
        "RE_EDU_TEMP_PROBE",
        "RE_EDU_WATER_FLOW",
        "RE_EDU_CURRENT_SENSOR"
      ]
    }
  ]
};
SME01131 = {
  ssh: { host: "SME01131", user_id: "avante", ip_address: "172.31.2.26" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 4,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_MAG_PSI_A"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME08716 = {
  ssh: { host: "SME08716", user_id: "avante", ip_address: "172.31.2.39" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 1,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_FIELD",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01135 = {
  ssh: { host: "SME01135", user_id: "avante", ip_address: "172.31.2.3" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_MSUP_META",
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01101 = {
  ssh: { host: "SME01101", user_id: "avante", ip_address: "172.31.2.4" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 5,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_BUTTONS",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_HE_VALUES_UNIFIED"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME11221 = {
  ssh: { host: "SME11221", user_id: "avante", ip_address: "172.31.0.8" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 3,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_TEST_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_HE_PARAMS",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COMPRESSOR_VALUE",
        "RE_SIEMENS_PRESS_SW_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_LINK_BORE",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CCR_S1_S2",
        "RE_SIEMENS_CCR_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_EPM",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS",
        "RE_SIEMENS_I_BTN"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 7,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME13573 = {
  ssh: { host: "SME13573", user_id: "avante", ip_address: "172.31.0.9" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens",
      schedule: 2,
      mmbScript: "v2_rdu_9600",
      regexModels: [
        "RE_SIEMENS_OR_CODE",
        "RE_SIEMENS_FIELD_CURRENT",
        "RE_SIEMENS_HOST_TIME_DATE",
        "RE_SIEMENS_SUP_TIME",
        "RE_SIEMENS_LVQD",
        "RE_SIEMENS_MSUP",
        "RE_SIEMENS_MAG_SN",
        "RE_SIEMENS_MAG_REV",
        "RE_SIEMENS_HE_VALUES_UNIFIED",
        "RE_SIEMENS_EIS_STATUS",
        "RE_SIEMENS_SELF_TEST",
        "RE_SIEMENS_BATTERY_STATUS",
        "RE_SIEMENS_SH_STATUS",
        "RE_SIEMENS_BATTERY_VOLTS",
        "RE_SIEMENS_PRESS_HTR",
        "RE_SIEMENS_COMPRESSOR_STATUS",
        "RE_SIEMENS_COLDHEAD",
        "RE_SIEMENS_SHIELD_SENSOR",
        "RE_SIEMENS_TURRET",
        "RE_SIEMENS_CARBON_R_S1_S2",
        "RE_SIEMENS_CARBON_R_S3_S4",
        "RE_SIEMENS_SWT_HTR",
        "RE_SIEMENS_QUH_HTR",
        "RE_SIEMENS_MAG_PSI_A",
        "RE_SIEMENS_AVG_PWR",
        "RE_SIEMENS_ERDU_STATUS",
        "RE_SIEMENS_ERDU_STATUS_ARRAY",
        "RE_SIEMENS_TESTS"
      ]
    }
  ]
};
SME01136 = {
  ssh: { host: "SME01136", user_id: "avante", ip_address: "172.31.2.23" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 4,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME01122 = {
  ssh: { host: "SME01122", user_id: "avante", ip_address: "172.31.2.40" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 5,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    },
    {
      pgTable: "mmb_edu2",
      schedule: 6,
      mmbScript: "v2_edu2",
      regexModels: [
        "RE_EDU2_COMP_VIB",
        "RE_EDU2_ROOM_PROBE_HUM_TEMP",
        "RE_EDU2_TEMP_PROBE_TEMPS"
      ]
    }
  ]
};
SME10219 = {
  ssh: { host: "SME10219", user_id: "avante", ip_address: "172.31.0.1" },
  rpp_configs: [
    {
      pgTable: "mmb_siemens_non_tim",
      schedule: 1,
      mmbScript: "v2_rdu_4800",
      regexModels: [
        "RE_SIEMENS_NT_MSUP_META",
        "RE_SIEMENS_NT_RX",
        "RE_SIEMENS_NT_HOST_TIME_DATE",
        "RE_SIEMENS_NT_TX",
        "RE_SIEMENS_NT_HE_PARAMS",
        "RE_SIEMENS_NT_HE_VALUES_PER",
        "RE_SIEMENS_NT_OUT_MEASURE_STATUS",
        "RE_SIEMENS_NT_SYS_IN_MSG_SYS_STATUS",
        "RE_SIEMENS_NT_SYS_PWR_FAIL",
        "RE_SIEMENS_NT_BAT_OUT_ERDU_BAT_STATUS",
        "RE_SIEMENS_NT_SHIELD_OUT_FRIDGE_STATUS",
        "RE_SIEMENS_NT_SHIELD_TEMP",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_ALARM",
        "RE_SIEMENS_NT_SHIELD_FRIDGE_WARN",
        "RE_SIEMENS_NT_RD_IN_MSG_HTR_STATUS",
        "RE_SIEMENS_NT_SCRU_OUT_EIS_STATUS",
        "RE_SIEMENS_NT_SCRU_IN_MSG_EIS_STATUS",
        "RE_SIEMENS_NT_IN_MSG_SWIT_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_OUT_AIR_CON_STATUS",
        "RE_SIEMENS_NT_CCA_CAB_TEMPS",
        "RE_SIEMENS_NT_GPA_CAB_TEMPS",
        "RE_SIEMENS_NT_TESTS_IN_FRIDGE_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_MSG_ALARM_STATUS",
        "RE_SIEMENS_NT_TESTS_IN_ERDU_LOAD_STATUS",
        "RE_SIEMENS_NT_SHIM_1",
        "RE_SIEMENS_NT_SHIM_2",
        "RE_SIEMENS_NT_SHIM_3",
        "RE_SIEMENS_NT_SHIM_4",
        "RE_SIEMENS_NT_SHIM_5",
        "RE_SIEMENS_NT_DC_W"
      ]
    }
  ]
};
