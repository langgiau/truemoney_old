package com.elcom.model.action;

import com.elcom.common.Common;
import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import java.util.Map;
import java.util.UUID;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class CommonPro {
  public JSONObject mshhUserUpdateUserInfo(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_MHSS_USER_UPDATE_ACCOUNT_INFO;
      objOutput = Common.commonPostForJsonObjectDuyCD_UpdateUser(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("CommonPro.mshhUserRegister ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject checksumFaceAccKit(String code) {
    JSONObject objOutput = null;
    try {
      String token_exchange_url = "https://graph.accountkit.com/" + Config.FACE_ACC_KIT_API_VERSION + "/access_token?grant_type=authorization_code&code=" + code + "&access_token=AA|" + Config.FACE_APP_ID + "|" + Config.FACE_ACC_KIT_APP_SECRET;
      JSONObject objOutput1 = Common.commonGetForJsonObject(token_exchange_url);
      if (objOutput1 != null && !objOutput1.isNull("access_token")) {
        String user_access_token = objOutput1.getString("access_token");
        String me_endpoint_url = "https://graph.accountkit.com/" + Config.FACE_ACC_KIT_API_VERSION + "/me?access_token=" + user_access_token;
        JSONObject objOutput2 = Common.commonGetForJsonObject(me_endpoint_url);
        if (objOutput2 != null && !objOutput2.isNull("phone")) {
          objOutput = objOutput2.getJSONObject("phone");
          objOutput.put("access_token", user_access_token);
        } 
      } 
    } catch (Exception e) {
      Log.log().error("CommonPro.checksumFaceAccKit ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getConfigQsmtInfos() {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_GET_CONFIG;
      objOutput = Common.commonGetForJsonObject(urlConfig);
    } catch (Exception e) {
      Log.log().error("CommonPro.getConfigQsmtInfos ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getKenoConfigQsmtInfos() {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_GET_CONFIG_KENO;
      objOutput = Common.commonGetForJsonObject(urlConfig);
    } catch (Exception e) {
      Log.log().error("CommonPro.getKenoConfigQsmtInfos ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getTruemoneyConfigFee() {
    JSONObject objOutput = null;
    try {
      UUID uuid = UUID.randomUUID();
      String urlConfig = Config.URL_SERVICES_GET_CONFIG_FEE_TRUEMONEY_API + "&transid=WV_" + uuid;
      objOutput = Common.commonGetForJsonObject(urlConfig);
      Log.log().info(" CALL API GET TRUEMONEY FEE: WV_" + uuid);
    } catch (Exception e) {
      Log.log().error("CommonPro.getTruemoneyConfigFee ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getDataKenoByOrderId(String orderId) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_GET_DATA_KENO_ORDER_ID + "?id=" + orderId;
      objOutput = Common.commonGetForJsonObjectPHAVD_Momo(urlConfig);
    } catch (Exception e) {
      Log.log().error("CommonPro.getDataKenoByOrderId ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getDataVietlottByDraw(Map fields) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_GET_DATA_VIETLOTT + "?" + Common.buildUrlFields(fields);
      objOutput = Common.commonGetForJsonObjectPHAVD_Momo(urlConfig);
    } catch (Exception e) {
      Log.log().error("CommonPro.getDataVietlottByDraw ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getDataVietlottByOrderId(String orderId) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_GET_DATA_ORDER_ID + "?id=" + orderId;
      objOutput = Common.commonGetForJsonObjectPHAVD_Momo(urlConfig);
    } catch (Exception e) {
      Log.log().error("CommonPro.getDataVietlottByOrderId ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject mshhUserCheckAccount(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_MHSS_USER_CHECK_ACCOUNT;
      Log.log().info("mshhUserCheckAccount:==> url: " + urlConfig);
      objOutput = Common.commonPostForJsonObjectDuyCD_VerifyUser(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("CommonPro.checkAccountLogin ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject mshhUserMsisdnPassConfirm(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_MHSS_USER_MSISDN_PASS_CONFIRM;
      objOutput = Common.commonPostForJsonObjectPHAVD_App(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("CommonPro.mshhUserMsisdnPassConfirm ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject mshhUserRegister(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_MHSS_USER_REGISTER;
      objOutput = Common.commonPostForJsonObjectPHAVD_Momo(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("CommonPro.mshhUserRegister ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject smsFbkitSendOtp(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_SMS_FBKIT_SEND_OTP;
      objOutput = Common.commonPostForJsonObjectPHAVD_Momo(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("CommonPro.smsFbkitSendOtp ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject smsFbkitAuthenOtp(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_SMS_FBKIT_AUTHEN_OTP;
      objOutput = Common.commonPostForJsonObjectPHAVD_Momo(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("CommonPro.smsFbkitAuthenOtp ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getDataVietlottProvince() {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.HIEUTT_SERVICE_API_PROVINCE_SHIP;
      objOutput = Common.commonGetForJsonObjectPHAVD_Momo(urlConfig);
    } catch (Exception e) {
      Log.log().error("CommonPro.getDataVietlottProvince ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getDataVietlottDistrictByPro(Map fields) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.HIEUTT_SERVICE_API_DISTRICT_SHIP + "?" + Common.buildUrlFields(fields);
      objOutput = Common.commonGetForJsonObjectPHAVD_Momo(urlConfig);
    } catch (Exception e) {
      Log.log().error("CommonPro.getDataVietlottDistrictByPro ==> error : ", e);
    } 
    return objOutput;
  }
}
