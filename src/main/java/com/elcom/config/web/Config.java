package com.elcom.config.web;

import java.io.File;

public class Config {
  public static String PATH = "/opt/vietlott";
  
  public static String BASE_FOLDER = PATH + File.separator;
  
  public static String CONFIG_FOLDER_NAME = BASE_FOLDER + "config" + File.separator;
  
  public static String CONFIG_FOLDER_UPLOAD = BASE_FOLDER + "upload";
  
  public static String FOLDER_NAME_PROJECT = "truemoney_web_public_final_v2" + File.separator;
  
  public static String CONFIG_FILE_NAME = "configweb.properties";
  
  public static String CONFIG_FILE_NAME_LOG = "configlog.xml";
  
  public static String pathFileConfig = BASE_FOLDER + "config" + File.separator + FOLDER_NAME_PROJECT + CONFIG_FILE_NAME;
  
  public static String pathFileConfigLog = BASE_FOLDER + "config" + File.separator + FOLDER_NAME_PROJECT + CONFIG_FILE_NAME_LOG;
  
  public static String MOMO_API_URL;
  
  public static String MOMO_PARTNER_CODE;
  
  public static String MOMO_PARTNER_NAME;
  
  public static String MOMO_ACCESS_KEY;
  
  public static String MOMO_SECRET_KEY;
  
  public static String FACE_APP_ID;
  
  public static String FACE_ACC_KIT_APP_CSRF;
  
  public static String FACE_ACC_KIT_APP_SECRET;
  
  public static String FACE_ACC_KIT_API_VERSION;
  
  public static String GG_SITE_VERIFY_URL;
  
  public static String GG_SITE_KEY;
  
  public static String GG_SECRET_KEY;
  
  public static String HIEUTT_SERVICE_API_PROVINCE_SHIP;
  
  public static String HIEUTT_SERVICE_API_DISTRICT_SHIP;
  
  public static String PHAVD_SERVICE_API_KEY;
  
  public static String PHAVD_SERVICE_SESSION_ID;
  
  public static String PHAVD_SERVICE_APP_SERVICE_ID;
  
  public static String PHAVD_SERVICE_APP_SESSION_ID;
  
  public static String URL_MOMO_NOTIFY;
  
  public static String URL_MOMO_RETURN;
  
  public static String URL_SERVICES_GET_CONFIG;
  
  public static String URL_SERVICES_BUY_ORDER;
  
  public static String URL_SERVICES_GET_CONFIG_KENO;
  
  public static String URL_SERVICES_GET_CONFIG_FEE_TRUEMONEY_API;
  
  public static String URL_SERVICES_VIEW_HISTORY_WAITING;
  
  public static String URL_SERVICES_VIEW_HISTORY_BUY_CANCEL;
  
  public static String URL_SERVICES_VIEW_HISTORY_KENO_WAITING;
  
  public static String URL_SERVICES_VIEW_HISTORY_KENO_BUY_CANCEL;
  
  public static String URL_SERVICES_GET_DATA_VIETLOTT;
  
  public static String URL_SERVICES_GET_DATA_ORDER_ID;
  
  public static String URL_SERVICES_GET_DATA_KENO_ORDER_ID;
  
  public static String URL_SERVICES_REPORT_TICKER_ERROR;
  
  public static String URL_SERVICES_SMS_FBKIT_SEND_OTP;
  
  public static String URL_SERVICES_SMS_FBKIT_AUTHEN_OTP;
  
  public static String URL_SERVICES_MHSS_USER_REGISTER;
  
  public static String URL_SERVICES_MHSS_USER_CHECK_ACCOUNT;
  
  public static String URL_SERVICES_MHSS_USER_MSISDN_PASS_CONFIRM;
  
  public static String SECRET_KEY;
  
  public static String API_SEND_OPT;
  
  public static String API_AUTH_OPT;
  
  public static String TRUEMONEY_ACCESS_KEY;
  
  public static String TRUEMONEY_SECRET_KEY;
  
  public static String URL_SERVICES_MHSS_USER_UPDATE_ACCOUNT_INFO;
  
  public static String LOG;
  
  public static String DRIVER;
  
  public static String URL;
  
  public static String USER;
  
  public static String PASS;
}
