package com.elcom.config.web;

import com.elcom.config.web.Config;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.util.Properties;

public class LoadConfig {
  private FileInputStream fis = null;
  
  private Properties pro = null;
  
  public void loadConfig() {
    try {
      this.fis = new FileInputStream(Config.pathFileConfig);
      this.pro = new Properties();
      this.pro.load(new InputStreamReader(this.fis, "UTF-8"));
      this.pro.list(System.out);
      Config.MOMO_API_URL = this.pro.getProperty("MOMO_API_URL").trim();
      Config.MOMO_PARTNER_CODE = this.pro.getProperty("MOMO_PARTNER_CODE").trim();
      Config.MOMO_PARTNER_NAME = this.pro.getProperty("MOMO_PARTNER_NAME").trim();
      Config.MOMO_ACCESS_KEY = this.pro.getProperty("MOMO_ACCESS_KEY").trim();
      Config.MOMO_SECRET_KEY = this.pro.getProperty("MOMO_SECRET_KEY").trim();
      Config.FACE_APP_ID = this.pro.getProperty("FACE_APP_ID").trim();
      Config.FACE_ACC_KIT_APP_CSRF = this.pro.getProperty("FACE_ACC_KIT_APP_CSRF").trim();
      Config.FACE_ACC_KIT_APP_SECRET = this.pro.getProperty("FACE_ACC_KIT_APP_SECRET").trim();
      Config.FACE_ACC_KIT_API_VERSION = this.pro.getProperty("FACE_ACC_KIT_API_VERSION").trim();
      Config.HIEUTT_SERVICE_API_PROVINCE_SHIP = this.pro.getProperty("HIEUTT_SERVICE_API_PROVINCE_SHIP").trim();
      Config.HIEUTT_SERVICE_API_DISTRICT_SHIP = this.pro.getProperty("HIEUTT_SERVICE_API_DISTRICT_SHIP").trim();
      Config.PHAVD_SERVICE_API_KEY = this.pro.getProperty("PHAVD_SERVICE_API_KEY").trim();
      Config.PHAVD_SERVICE_SESSION_ID = this.pro.getProperty("PHAVD_SERVICE_SESSION_ID").trim();
      Config.PHAVD_SERVICE_APP_SERVICE_ID = this.pro.getProperty("PHAVD_SERVICE_APP_SERVICE_ID").trim();
      Config.PHAVD_SERVICE_APP_SESSION_ID = this.pro.getProperty("PHAVD_SERVICE_APP_SESSION_ID").trim();
      Config.URL_MOMO_NOTIFY = this.pro.getProperty("URL_MOMO_NOTIFY").trim();
      Config.URL_MOMO_RETURN = this.pro.getProperty("URL_MOMO_RETURN").trim();
      Config.URL_SERVICES_GET_CONFIG = this.pro.getProperty("URL_SERVICES_GET_CONFIG").trim();
      Config.URL_SERVICES_GET_CONFIG_KENO = this.pro.getProperty("URL_SERVICES_GET_CONFIG_KENO").trim();
      Config.URL_SERVICES_GET_CONFIG_FEE_TRUEMONEY_API = this.pro.getProperty("URL_SERVICES_GET_CONFIG_FEE_TRUEMONEY_API").trim();
      Config.URL_SERVICES_BUY_ORDER = this.pro.getProperty("URL_SERVICES_BUY_ORDER").trim();
      Config.URL_SERVICES_VIEW_HISTORY_WAITING = this.pro.getProperty("URL_SERVICES_VIEW_HISTORY_WAITING").trim();
      Config.URL_SERVICES_VIEW_HISTORY_BUY_CANCEL = this.pro.getProperty("URL_SERVICES_VIEW_HISTORY_BUY_CANCEL").trim();
      Config.URL_SERVICES_VIEW_HISTORY_KENO_WAITING = this.pro.getProperty("URL_SERVICES_VIEW_HISTORY_KENO_WAITING").trim();
      Config.URL_SERVICES_VIEW_HISTORY_KENO_BUY_CANCEL = this.pro.getProperty("URL_SERVICES_VIEW_HISTORY_KENO_BUY_CANCEL").trim();
      Config.URL_SERVICES_GET_DATA_VIETLOTT = this.pro.getProperty("URL_SERVICES_GET_DATA_VIETLOTT").trim();
      Config.URL_SERVICES_GET_DATA_ORDER_ID = this.pro.getProperty("URL_SERVICES_GET_DATA_ORDER_ID").trim();
      Config.URL_SERVICES_GET_DATA_KENO_ORDER_ID = this.pro.getProperty("URL_SERVICES_GET_DATA_KENO_ORDER_ID").trim();
      Config.URL_SERVICES_REPORT_TICKER_ERROR = this.pro.getProperty("URL_SERVICES_REPORT_TICKER_ERROR").trim();
      Config.URL_SERVICES_SMS_FBKIT_SEND_OTP = this.pro.getProperty("URL_SERVICES_SMS_FBKIT_SEND_OTP").trim();
      Config.URL_SERVICES_SMS_FBKIT_AUTHEN_OTP = this.pro.getProperty("URL_SERVICES_SMS_FBKIT_AUTHEN_OTP").trim();
      Config.URL_SERVICES_MHSS_USER_REGISTER = this.pro.getProperty("URL_SERVICES_MHSS_USER_REGISTER").trim();
      Config.URL_SERVICES_MHSS_USER_CHECK_ACCOUNT = this.pro.getProperty("URL_SERVICES_MHSS_USER_CHECK_ACCOUNT").trim();
      Config.URL_SERVICES_MHSS_USER_MSISDN_PASS_CONFIRM = this.pro.getProperty("URL_SERVICES_MHSS_USER_MSISDN_PASS_CONFIRM").trim();
      Config.LOG = this.pro.getProperty("LOG").trim();
      Config.SECRET_KEY = this.pro.getProperty("SECRET_KEY").trim();
      Config.API_SEND_OPT = this.pro.getProperty("API_SEND_OPT").trim();
      Config.API_AUTH_OPT = this.pro.getProperty("API_AUTH_OPT").trim();
      Config.TRUEMONEY_ACCESS_KEY = this.pro.getProperty("TRUEMONEY_ACCESS_KEY").trim();
      Config.TRUEMONEY_SECRET_KEY = this.pro.getProperty("TRUEMONEY_SECRET_KEY").trim();
      Config.URL_SERVICES_MHSS_USER_UPDATE_ACCOUNT_INFO = this.pro.getProperty("URL_SERVICES_MHSS_USER_UPDATE_ACCOUNT_INFO").trim();
      Config.DRIVER = this.pro.getProperty("DRIVER").trim();
      Config.URL = this.pro.getProperty("URL").trim();
      Config.USER = this.pro.getProperty("USER").trim();
      Config.PASS = this.pro.getProperty("PASS").trim();
    } catch (Exception e) {
      e.printStackTrace();
      System.err.println("Not load config" + e.getMessage());
      System.err.println("Not load config" + e);
    } finally {
      try {
        this.fis.close();
      } catch (Exception ex) {
        System.err.println("Not close file config!" + ex.getMessage());
        System.err.println("Not close file config!" + ex);
      } 
    } 
  }
  
  public void checkConfig() {
    try {
      String fileUploadStr = Config.CONFIG_FOLDER_UPLOAD;
      File fileUpload = new File(fileUploadStr);
      if (!fileUpload.exists())
        fileUpload.mkdirs(); 
      String fileStr = Config.CONFIG_FOLDER_NAME;
      File file = new File(fileStr);
      if (!file.exists())
        file.mkdirs(); 
      fileStr = fileStr + Config.FOLDER_NAME_PROJECT;
      file = new File(fileStr);
      if (!file.exists())
        file.mkdirs(); 
      createDefaultConfigFile(file, fileStr);
      createDefaultConfigLogFile(file, fileStr);
    } catch (Exception e) {
      System.err.println("Not check config" + e);
    } 
  }
  
  private void createDefaultConfigFile(File file, String fileStr) {
    String fileNew = fileStr + Config.CONFIG_FILE_NAME;
    try {
      file = new File(fileNew);
      if (!file.exists()) {
        BufferedWriter w = new BufferedWriter(new FileWriter(file));
        w.write("MOMO_API_URL=https://partner.dev.truemoney.com.vn/paymentgw/api/v1/deeplink");
        w.newLine();
        w.write("MOMO_PARTNER_CODE=MOMOIQA420180417");
        w.newLine();
        w.write("MOMO_PARTNER_NAME=Cty Co Phan LUCKYBEST VIETNAM");
        w.newLine();
        w.write("MOMO_ACCESS_KEY=m878bjuwngzr83qjm3fp");
        w.newLine();
        w.write("MOMO_SECRET_KEY=z118wytq7htjja3nkuwju8pi3kjy9zlr");
        w.newLine();
        w.write("FACE_APP_ID=969326589900284");
        w.newLine();
        w.write("FACE_ACC_KIT_APP_CSRF=88dcb615ee66843facaee589420ef516");
        w.newLine();
        w.write("FACE_ACC_KIT_APP_SECRET=31f837b4e8c4b50c1bd7bf3317c05553");
        w.newLine();
        w.write("FACE_ACC_KIT_API_VERSION=v1.1");
        w.newLine();
        w.write("HIEUTT_SERVICE_API_PROVINCE_SHIP=http://103.63.109.215:5566/api/vietlott/customer/province_ship");
        w.newLine();
        w.write("HIEUTT_SERVICE_API_DISTRICT_SHIP=http://103.63.109.215:5566/api/vietlott/customer/district_ship");
        w.newLine();
        w.write("PHAVD_SERVICE_API_KEY=ESC-VIETLOTT-E2018");
        w.newLine();
        w.write("PHAVD_SERVICE_SESSION_ID=8fhP2LX4fCJu0001103a");
        w.newLine();
        w.write("PHAVD_SERVICE_APP_SERVICE_ID=ESC-VIETLOTT-E2018");
        w.newLine();
        w.write("PHAVD_SERVICE_APP_SESSION_ID=MOMO API");
        w.newLine();
        w.write("URL_MOMO_NOTIFY=https://app.elcom.com.vn:9345/api/momo/confirm");
        w.newLine();
        w.write("URL_MOMO_RETURN=https://luckybest.vn/webpublic/");
        w.newLine();
        w.write("URL_SERVICES_GET_CONFIG=http://app.elcom.com.vn:5566/api/vietlott/customer/get_config?os_type=0&current_version=3");
        w.newLine();
        w.write("URL_SERVICES_BUY_ORDER=https://app.elcom.com.vn:8843/api/vietlott/order");
        w.newLine();
        w.write("URL_SERVICES_VIEW_HISTORY_WAITING=https://app.elcom.com.vn:8843/api/vietlott/customer/get_orders");
        w.newLine();
        w.write("URL_SERVICES_VIEW_HISTORY_BUY_CANCEL=https://app.elcom.com.vn:5588/api/vietlott/customer/history/get_orders");
        w.newLine();
        w.write("URL_SERVICES_GET_DATA_VIETLOTT=https://app.elcom.com.vn:5588/api/vietlott/customer/result/draw");
        w.newLine();
        w.write("URL_SERVICES_GET_DATA_ORDER_ID=https://app.elcom.com.vn:5588/api/vietlott/customer/get_order");
        w.newLine();
        w.write("URL_SERVICES_REPORT_TICKER_ERROR=http://103.63.109.215:5566/api/vietlott/customer/resend_picture");
        w.newLine();
        w.write("URL_SERVICES_SMS_FBKIT_SEND_OTP=https://luckybets.vn:8643/api/vietlott/sms_fbkit/send_otp");
        w.newLine();
        w.write("URL_SERVICES_SMS_FBKIT_AUTHEN_OTP=https://luckybets.vn:8643/api/vietlott/sms_fbkit/authen_otp");
        w.newLine();
        w.write("URL_SERVICES_MHSS_USER_REGISTER=http://101.99.23.175:8581/api/mhss/user/register");
        w.newLine();
        w.write("URL_SERVICES_MHSS_USER_CHECK_ACCOUNT=http://101.99.23.175:8581/api/mhss/user/check_account");
        w.newLine();
        w.write("URL_SERVICES_MHSS_USER_MSISDN_PASS_CONFIRM=http://app.elcom.com.vn:8581/api/mhss/agent/check_password");
        w.newLine();
        w.write("LOG=log");
        w.newLine();
        w.write("DRIVER=oracle.jdbc.driver.OracleDriver");
        w.newLine();
        w.write("URL=jdbc:oracle:thin:@(description=(address=(host=192.168.6.246)(protocol=tcp)(port=1522))(connect_data=(SERVER = DEDICATED)(sid=orcl)))");
        w.newLine();
        w.write("USER=vietlott");
        w.newLine();
        w.write("PASS=vietlott");
        w.newLine();
        w.flush();
        w.close();
      } 
    } catch (Exception ex) {
      System.err.println("Not build config" + ex);
    } 
  }
  
  private void createDefaultConfigLogFile(File file, String fileStr) {
    String fileNew = fileStr + Config.CONFIG_FILE_NAME_LOG;
    String pathLog = Config.BASE_FOLDER + "log" + File.separator + Config.FOLDER_NAME_PROJECT + "log.log";
    pathLog = pathLog.replace("\\", "\\\\");
    try {
      file = new File(fileNew);
      if (!file.exists()) {
        BufferedWriter w = new BufferedWriter(new FileWriter(file));
        w.write("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
        w.newLine();
        w.write("<!DOCTYPE log4j:configuration SYSTEM \"log4j.dtd\">");
        w.newLine();
        w.write("<log4j:configuration xmlns:log4j=\"http://jakarta.apache.org/log4j/\" debug=\"false\">");
        w.newLine();
        w.write("\t<appender name=\"LOG_FILE\" class=\"org.apache.log4j.DailyRollingFileAppender\">");
        w.newLine();
        w.write("\t\t<param name=\"Threshold\" value=\"INFO\" />");
        w.newLine();
        w.write("\t\t<param name=\"File\" value=\"" + pathLog + "\" />");
        w.newLine();
        w.write("\t\t<param name=\"Append\" value=\"true\" />");
        w.newLine();
        w.write("\t\t<param name=\"DatePattern\" value=\".yyyyMMdd_HH\" />");
        w.newLine();
        w.write("\t\t<layout class=\"org.apache.log4j.PatternLayout\">");
        w.newLine();
        w.write("\t\t\t<param name=\"ConversionPattern\" value=\"[%-5p] - [%-23d{ISO8601}] - [%-28t] - %m%n\" />");
        w.newLine();
        w.write("\t\t</layout>");
        w.newLine();
        w.write("\t</appender>");
        w.newLine();
        w.write("\t<category name=\"log\" additivity=\"false\">");
        w.newLine();
        w.write("\t\t<appender-ref ref=\"LOG_FILE\" />");
        w.newLine();
        w.write("\t</category>");
        w.newLine();
        w.write("</log4j:configuration>");
        w.newLine();
        w.flush();
        w.close();
      } 
    } catch (Exception ex) {
      System.err.println("Not build config log" + ex);
    } 
  }
}
