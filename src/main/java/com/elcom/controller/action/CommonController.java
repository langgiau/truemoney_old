package com.elcom.controller.action;

import com.elcom.common.Common;
import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import com.elcom.model.action.CommonPro;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
@RequestMapping({"/action/common"})
public class CommonController {
  @Autowired
  CommonPro commonPro;
  
  private static String urlNameRequest = "/action/common";
  
  @RequestMapping(value = {"/checkCaptcha"}, method = {RequestMethod.POST})
  public Map<String, Object> checkCaptcha(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("message", "error");
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String client_Captcha = jsonInput.getString("clientCaptcha");
      String server_Captcha = req.getSession().getAttribute("LUCKYBETS_SS_CAPTCHA").toString();
      if (server_Captcha.equalsIgnoreCase(client_Captcha)) {
        model.put("code", Integer.valueOf(0));
        model.put("message", "OK");
      } else {
        model.put("code", Integer.valueOf(11));
        model.put("message", "Mã xác nhận không hợp lệ");
      } 
    } catch (Exception e) {
      Log.log().error("CommonController.checkCaptcha ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getConfigQsmtInfos"}, method = {RequestMethod.POST})
  public Map<String, Object> getConfigQsmtInfos(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonOutput = this.commonPro.getConfigQsmtInfos();
      JSONArray lAll = new JSONArray();
      if (jsonOutput != null && !jsonOutput.isNull("qsmtInfos"))
        lAll = jsonOutput.getJSONArray("qsmtInfos"); 
      JSONArray lAllBookingTickets = new JSONArray();
      if (jsonOutput != null && !jsonOutput.isNull("bookingTickets"))
        lAllBookingTickets = jsonOutput.getJSONArray("bookingTickets"); 
      JSONArray lAllBannersTickets = new JSONArray();
      if (jsonOutput != null && !jsonOutput.isNull("banners"))
        lAllBannersTickets = jsonOutput.getJSONArray("banners"); 
      model.put("code", Integer.valueOf(0));
      model.put("data", lAll.toList());
      model.put("bookingTickets", lAllBookingTickets.toList());
      model.put("banners", lAllBannersTickets.toList());
    } catch (Exception e) {
      Log.log().error("CommonController.getConfigQsmtInfos ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getKenoConfigQsmtInfos"}, method = {RequestMethod.POST})
  public Map<String, Object> getKenoConfigQsmtInfos(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonOutput = this.commonPro.getKenoConfigQsmtInfos();
      JSONObject dataObj = new JSONObject();
      JSONObject jSONObject = new JSONObject();
      if (jsonOutput != null && !jsonOutput.isNull("data")) {
        dataObj = jsonOutput.getJSONObject("data");
        jSONObject.put("category", 6);
        jSONObject.put("openDate", dataObj.get("spinPrizeTime"));
        jSONObject.put("drawCode", dataObj.get("periodId"));
        jSONObject.put("closeOrderTime", dataObj.get("closeOrderTime"));
      } 
      JSONArray lAll = new JSONArray();
      lAll.put(jSONObject);
      model.put("code", Integer.valueOf(0));
      model.put("data", lAll.toList());
    } catch (Exception e) {
      Log.log().error("CommonController.getKenoConfigQsmtInfos ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getTruemoneyConfigFee"}, method = {RequestMethod.POST})
  public Map<String, Object> getTruemoneyConfigFee(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    String sdt = Common.parseString(Common.commonGetMsisdnLogin(req));
    if (sdt.length() == 0) {
      model.put("code", Integer.valueOf(998));
      model.put("object", "");
      return model;
    } 
    try {
      JSONObject jsonOutput = this.commonPro.getTruemoneyConfigFee();
      JSONObject dataObj = new JSONObject();
      JSONObject jSONObject = new JSONObject();
      JSONArray lAll = new JSONArray();
      if (jsonOutput != null && !jsonOutput.isNull("data")) {
        dataObj = jsonOutput.getJSONObject("data");
        lAll = dataObj.getJSONArray("items");
      } 
      model.put("code", Integer.valueOf(0));
      model.put("data", lAll.toList());
    } catch (Exception e) {
      Log.log().error("CommonController.getTruemoneyConfigFee ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getDataKenoByOrderId"}, method = {RequestMethod.POST})
  public Map<String, Object> getDataKenoByOrderId(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("object", new Object());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String orderId = jsonInput.getString("orderId");
      JSONObject jsonOutput = this.commonPro.getDataKenoByOrderId(orderId);
      JSONObject objResult = new JSONObject();
      if (jsonOutput != null && !jsonOutput.isNull("paperTicketOrderInfo"))
        objResult = jsonOutput.getJSONObject("paperTicketOrderInfo"); 
      model.put("code", Integer.valueOf(0));
      model.put("object", (new Gson()).fromJson(objResult.toString(), Object.class));
    } catch (Exception e) {
      Log.log().error("CommonController.getDataKenoByOrderId ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getConfigTermInfo"}, method = {RequestMethod.POST})
  public Map<String, Object> getConfigTermInfo(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("object", new Object());
    try {
      JSONObject jsonOutput = this.commonPro.getConfigQsmtInfos();
      JSONObject objResult = new JSONObject();
      if (jsonOutput != null && !jsonOutput.isNull("termInfo"))
        objResult = jsonOutput.getJSONObject("termInfo"); 
      model.put("code", Integer.valueOf(0));
      model.put("object", (new Gson()).fromJson(objResult.toString(), Object.class));
    } catch (Exception e) {
      Log.log().error("CommonController.getConfigTermInfo ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getDataVietlottByDraw"}, method = {RequestMethod.POST})
  public Map<String, Object> getDataVietlottByDraw(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String category = jsonInput.getString("category");
      String draw = jsonInput.getString("draw");
      Map<Object, Object> paramInput = new LinkedHashMap<>();
      paramInput.put("category", category + "");
      paramInput.put("draw", draw + "");
      JSONObject jsonOutput = this.commonPro.getDataVietlottByDraw(paramInput);
      JSONArray lAll = new JSONArray();
      if (jsonOutput != null && !jsonOutput.isNull("resultInfos"))
        lAll = jsonOutput.getJSONArray("resultInfos"); 
      model.put("code", Integer.valueOf(0));
      model.put("data", lAll.toList());
    } catch (Exception e) {
      Log.log().error("CommonController.getDataVietlottByDraw ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getDataVietlottByOrderId"}, method = {RequestMethod.POST})
  public Map<String, Object> getDataVietlottByOrderId(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("object", new Object());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String orderId = jsonInput.getString("orderId");
      JSONObject jsonOutput = this.commonPro.getDataVietlottByOrderId(orderId);
      JSONObject objResult = new JSONObject();
      if (jsonOutput != null && !jsonOutput.isNull("paperTicketOrderInfo"))
        objResult = jsonOutput.getJSONObject("paperTicketOrderInfo"); 
      model.put("code", Integer.valueOf(0));
      model.put("object", (new Gson()).fromJson(objResult.toString(), Object.class));
    } catch (Exception e) {
      Log.log().error("CommonController.getDataVietlottByOrderId ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/mshhUserCheckAccount"}, method = {RequestMethod.POST})
  public Map<String, Object> mshhUserCheckAccount(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(0));
    model.put("object", new Object());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      if (Common.commonGetMsisdnLogin(req).length() == 0) {
        model.put("code", Integer.valueOf(2));
        model.put("object", (new Gson()).fromJson("{\"result\":{\"code\":2}}", Object.class));
        return model;
      } 
      if (jsonInput.getString("msisdn") != null) {
        String msisdn = "";
        if (jsonInput.getString("msisdn").length() == 0) {
          msisdn = Common.convertMsisdn(Common.commonGetMsisdnLogin(req), "84");
        } else {
          Log.log().info("CommonController.mshhUserCheckAccount ==> msisdn trong session khong co gi ");
          msisdn = jsonInput.getString("msisdn");
        } 
        String deviceId = jsonInput.getString("deviceId");
        JSONObject jsonDataInput = new JSONObject();
        jsonDataInput.put("accountId", msisdn + "");
        jsonDataInput.put("deviceId", deviceId + "");
        Log.log().info("CommonController.mshhUserCheckAccount input ==> : " + jsonDataInput);
        JSONObject jsonOutput = this.commonPro.mshhUserCheckAccount(jsonDataInput);
        Log.log().info("CommonController.mshhUserCheckAccount output ==> : " + jsonOutput);
        model.put("code", Integer.valueOf(0));
        model.put("object", (new Gson()).fromJson(jsonOutput.toString(), Object.class));
      } else {
        Log.log().info("CommonController.mshhUserCheckAccount ==> msisdn is null  ");
      } 
    } catch (Exception e) {
      Log.log().error("CommonController.mshhUserCheckAccount ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/mshhUserRegister"}, method = {RequestMethod.POST})
  public Map<String, Object> mshhUserRegister(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("object", new Object());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String msisdn = jsonInput.getString("msisdn");
      String accToken = jsonInput.getString("accToken");
      String passNew = jsonInput.getString("passNew");
      String deviceId = jsonInput.getString("deviceId");
      JSONObject jsonDataInput = new JSONObject();
      jsonDataInput.put("accountId", msisdn + "");
      jsonDataInput.put("activeMethod", "facebook");
      jsonDataInput.put("deviceId", deviceId + "");
      jsonDataInput.put("password", Common.md5(passNew));
      jsonDataInput.put("token", accToken);
      JSONObject jsonOutput = this.commonPro.mshhUserRegister(jsonDataInput);
      JSONObject objResult = new JSONObject();
      if (jsonOutput != null && !jsonOutput.isNull("result"))
        objResult = jsonOutput.getJSONObject("result"); 
      model.put("code", Integer.valueOf(0));
      model.put("object", (new Gson()).fromJson(objResult.toString(), Object.class));
    } catch (Exception e) {
      Log.log().error("CommonController.mshhUserRegister ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/sendOtp"}, method = {RequestMethod.POST})
  public Map<String, Object> sendOtp(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("object", new Object());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String userPhone = jsonInput.getString("userPhone");
      JSONObject deviceInfo = new JSONObject();
      deviceInfo.put("devId", Common.parseString(req.getSession().getAttribute("mid")));
      deviceInfo.put("deviceName", "");
      deviceInfo.put("osName", "");
      deviceInfo.put("osVersion", "Web Truemoney");
      deviceInfo.put("other", "luckybets");
      JSONObject inputJson = new JSONObject();
      inputJson.put("accountId", userPhone);
      inputJson.put("deviceInfo", deviceInfo);
      inputJson.put("requestId", (new Random()).nextInt(2147483647) + "");
      Log.log().error("CommonController.sendOtp ==> intput : " + inputJson);
      JSONObject output = Common.commonPostForJsonObjectPHAVD(Config.API_SEND_OPT, inputJson);
      Log.log().error("CommonController.sendOtp ==> output : " + output);
      model.put("code", Integer.valueOf(output.getInt("result")));
      model.put("object", (new Gson()).fromJson(output.toString(), Object.class));
    } catch (Exception e) {
      Log.log().error("CommonController.sendOtp ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/smsAuthOtp"}, method = {RequestMethod.POST})
  public Map<String, Object> smsAuthOtp(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("object", new Object());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String userPhone = jsonInput.getString("userPhone");
      String otpCode = jsonInput.getString("otpCode");
      JSONObject deviceInfo = new JSONObject();
      deviceInfo.put("devId", Common.parseString(req.getSession().getAttribute("mid")));
      deviceInfo.put("deviceName", "");
      deviceInfo.put("osName", "");
      deviceInfo.put("osVersion", "Web MOMO");
      deviceInfo.put("other", "luckybets");
      JSONObject inputJson = new JSONObject();
      inputJson.put("accountId", userPhone);
      inputJson.put("deviceInfo", deviceInfo);
      inputJson.put("requestId", (new Random()).nextInt(2147483647) + "");
      inputJson.put("otpCode", otpCode);
      Log.log().info("CommonController.smsAuthOtp ==> intput : " + inputJson);
      JSONObject output = Common.commonPostForJsonObjectPHAVD(Config.API_AUTH_OPT, inputJson);
      Log.log().info("CommonController.smsAuthOtp ==> output : " + output);
      if (output.getInt("result") == 0)
        req.getSession().setAttribute("msisdn", userPhone); 
      model.put("code", Integer.valueOf(output.getInt("result")));
      model.put("object", (new Gson()).fromJson(output.toString(), Object.class));
    } catch (Exception e) {
      Log.log().error("CommonController.smsAuthOtp ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/mshhUserUpdate"}, method = {RequestMethod.POST})
  public Map<String, Object> mshhUserUpdate(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("object", new Object());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      Log.log().info("CommonController.mshhUserUpdate ==> input : " + jsonInput);
      JSONObject jsonOutput = this.commonPro.mshhUserUpdateUserInfo(jsonInput);
      Log.log().info("CommonController.mshhUserUpdate ==> output : " + jsonOutput);
      model.put("code", Integer.valueOf(0));
      model.put("object", (new Gson()).fromJson(jsonOutput.toString(), Object.class));
      JSONObject objResult = new JSONObject();
      if (jsonOutput != null && !jsonOutput.isNull("result"))
        objResult = jsonOutput.getJSONObject("result"); 
    } catch (Exception e) {
      Log.log().error("CommonController.mshhUserUpdate ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getDataVietlottProvince"}, method = {RequestMethod.POST})
  public Map<String, Object> getDataVietlottProvince(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonOutput = this.commonPro.getDataVietlottProvince();
      JSONArray lAll = new JSONArray();
      if (jsonOutput != null && !jsonOutput.isNull("provinces"))
        lAll = jsonOutput.getJSONArray("provinces"); 
      model.put("code", Integer.valueOf(0));
      model.put("data", lAll.toList());
    } catch (Exception e) {
      Log.log().error("CommonController.getDataVietlottProvince ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getDataVietlottDistrictByPro"}, method = {RequestMethod.POST})
  public Map<String, Object> getDataVietlottDistrictByPro(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String idProvice = jsonInput.getString("idProvice");
      Map<Object, Object> paramInput = new LinkedHashMap<>();
      paramInput.put("province_id", idProvice + "");
      JSONObject jsonOutput = this.commonPro.getDataVietlottDistrictByPro(paramInput);
      JSONArray lAll = new JSONArray();
      if (jsonOutput != null && !jsonOutput.isNull("districts"))
        lAll = jsonOutput.getJSONArray("districts"); 
      model.put("code", Integer.valueOf(0));
      model.put("data", lAll.toList());
    } catch (Exception e) {
      Log.log().error("CommonController.getDataVietlottDistrictByPro ==> error : ", e);
    } 
    return model;
  }
}
