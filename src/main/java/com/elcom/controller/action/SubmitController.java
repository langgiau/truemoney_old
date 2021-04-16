package com.elcom.controller.action;

import com.elcom.common.Common;
import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import com.elcom.dto.CustomerInfoDTO;
import com.elcom.dto.ReceiverInfoDTO;
import com.elcom.model.action.CommonPro;
import com.elcom.model.action.SubmitPro;
import com.elcom.utils.ShaFormat;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
@RequestMapping({"/action/submit"})
public class SubmitController {
  @Autowired
  CommonPro commonPro;
  
  @Autowired
  SubmitPro submitPro;
  
  private static String urlNameRequest = "/action/submit";
  
  @RequestMapping(value = {"/data"}, method = {RequestMethod.POST})
  public Map<String, Object> submitForm(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("message", "error");
    model.put("data", "error");
    try {
      try {
        JSONObject jsonInput = new JSONObject(req.getParameter("json"));
        JSONObject jsonInputToUpdateUser = new JSONObject();
        jsonInputToUpdateUser.put("cmnd", jsonInput.getString("userCMND"));
        jsonInputToUpdateUser.put("email", "");
        jsonInputToUpdateUser.put("fullName", jsonInput.getString("userName"));
        jsonInputToUpdateUser.put("accountId", jsonInput.getString("userPhone"));
        String userPhone = jsonInput.getString("userPhone");
        Map<String, Object> resultUpdateUser = Common.mshhUserUpdate(jsonInputToUpdateUser);
        if (resultUpdateUser.get("code").toString().equalsIgnoreCase("0")) {
          Log.log().info("update info user success: MSISDN: " + userPhone);
        } else {
          Log.log().info("update info user false: MSISDN: " + userPhone);
        } 
      } catch (Exception e) {
        Log.log().error("SubmitController.UpdateUserInfo ==> error : ", e);
      } 
      model = submitCommonData(req);
    } catch (Exception e) {
      Log.log().error("SubmitController.submitForm ==> error : ", e);
    } 
    return model;
  }
  
  private Map<String, Object> submitCommonData(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("message", "error");
    model.put("data", "error");
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String userPhone = jsonInput.getString("userPhone");
      String userShipType = "2";
      String userName = jsonInput.getString("userName");
      String userCMND = jsonInput.getString("userCMND");
      String userAddress = jsonInput.getString("userAddress");
      String userLat = jsonInput.getString("userLat");
      String userLng = jsonInput.getString("userLng");
      String orderArrPower655 = jsonInput.getString("orderArrPower655");
      String orderArrMega645 = jsonInput.getString("orderArrMega645");
      String orderArrMax4D = jsonInput.getString("orderArrMax4D");
      String orderArrMax3D = jsonInput.getString("orderArrMax3D");
      String orderArrMax3DPlus = jsonInput.getString("orderArrMax3DPlus");
      String orderArrOmMax3DPlus = jsonInput.getString("orderArrOmMax3DPlus");
      String orderArrBulk = jsonInput.getString("orderArrBulk");
      String orderArrKeno = jsonInput.getString("orderArrKeno");
      CustomerInfoDTO customerInfoDTO = new CustomerInfoDTO();
      customerInfoDTO.setCustomerName("TM API");
      customerInfoDTO.setPhoneNumber(userPhone);
      customerInfoDTO.setAddress("");
      customerInfoDTO.setLat("0");
      customerInfoDTO.setLng("0");
      ReceiverInfoDTO receiverInfoDTO = new ReceiverInfoDTO();
      receiverInfoDTO.setName(userName);
      receiverInfoDTO.setPhone(userPhone);
      receiverInfoDTO.setCmnd(userCMND);
      receiverInfoDTO.setAddress(userAddress);
      receiverInfoDTO.setLat(userLat);
      receiverInfoDTO.setLng(userLng);
      JSONObject jsonOutputResult = this.submitPro.orderTickerPhaVD_Momo(userPhone, userShipType, orderArrPower655, orderArrMega645, orderArrMax4D, orderArrMax3D, orderArrMax3DPlus, orderArrOmMax3DPlus, orderArrBulk, orderArrKeno, customerInfoDTO, receiverInfoDTO);
      if (jsonOutputResult != null) {
        int result = jsonOutputResult.getInt("result");
        if (result == 0) {
          double totalMoney = jsonOutputResult.getDouble("totalMoney");
          if (jsonOutputResult.has("orderIdInfo")) {
            JSONObject orderIdInfo = jsonOutputResult.getJSONObject("orderIdInfo");
            int orderId = orderIdInfo.getInt("orderId");
            int orderIdMask = orderIdInfo.getInt("orderIdMask");
            String notifyUrl = Config.URL_MOMO_NOTIFY;
            String returnUrl = Config.URL_MOMO_RETURN;
            String partnerCode = Config.MOMO_PARTNER_CODE;
            String accessKey = Config.MOMO_ACCESS_KEY;
            String secretKey = Config.MOMO_SECRET_KEY;
            String requestId = "MM" + (new Random()).nextInt(2147483647) + "";
            String amount = Common.commonFormatMoney(totalMoney);
            String orderInfo = "Thanh toán đơn hàng LuckyBest mã " + orderIdMask;
            String extraData = "email=abc@gmail.com";
            Map<String, String> truemoneyParams = new LinkedHashMap<>();
            truemoneyParams.put("access_key", accessKey);
            truemoneyParams.put("amount", amount + "");
            truemoneyParams.put("order_id", orderId + "");
            truemoneyParams.put("order_info", orderInfo);
            String signatureCode = ShaFormat.generateSignatures(accessKey, amount + "", orderId + "", orderInfo, secretKey);
            JSONObject truemoneyPostInput = new JSONObject();
            truemoneyPostInput.put("access_key", accessKey);
            truemoneyPostInput.put("amount", amount);
            truemoneyPostInput.put("order_id", orderId);
            truemoneyPostInput.put("order_info", orderInfo);
            truemoneyPostInput.put("wallet_code", "");
            truemoneyPostInput.put("payment_type", "2");
            truemoneyPostInput.put("customer_name", "");
            truemoneyPostInput.put("customer_email", "");
            truemoneyPostInput.put("customer_phone", "");
            truemoneyPostInput.put("language", "vi");
            truemoneyPostInput.put("signature", signatureCode);
            truemoneyPostInput.put("order_id_mask", orderIdMask);
            Log.log().info("truemoneyPostInput:   " + truemoneyPostInput);
            JSONObject jsonOutputTruemoney = this.submitPro.orderTickerServer_Momo(truemoneyPostInput);
            Log.log().info("jsonOutputTruemoney:   " + jsonOutputTruemoney);
            if (jsonOutputTruemoney != null) {
              String errorCode = jsonOutputTruemoney.getString("response_code");
              String message = jsonOutputTruemoney.getString("response_message");
              if (errorCode.endsWith("00")) {
                JSONObject data = jsonOutputTruemoney.getJSONObject("data");
                String truemoneyPayUrl = data.getString("dynamic_url");
                model.put("code", Integer.valueOf(0));
                model.put("message", "success");
                model.put("data", truemoneyPayUrl);
                Log.log().info(userPhone + "::---------------------------------------------------------------------------------------------------");
                Log.log().info(userPhone + "::---------------------------------------------------------------------------------------------------");
                Common.logEventAck(req, urlNameRequest, "INSERT", "SUCCESS", userPhone + "::tao don hang thanh cong orderId: " + orderId);
                Common.logEventAck(req, urlNameRequest, "INSERT", "SUCCESS", userPhone + "::don hang voi msisdn: " + Common.convertMsisdn(userPhone, "84"));
              } else {
                Log.log().info(userPhone + "::---------------------------------------------------------------------------------------------------");
                Log.log().info(userPhone + "::---------------------------------------------------------------------------------------------------");
                Common.logEventAck(req, urlNameRequest, "INSERT", "ERROR", userPhone + "::tao don hang thanh cong orderId: " + orderId);
                Common.logEventAck(req, urlNameRequest, "INSERT", "ERROR", userPhone + "::check truemoney server khong thanh cong errorCode: " + errorCode);
              } 
            } 
          } 
        } else if (result == 42) {
          Log.log().info(userPhone + "::---------------------------------------------------------------------------------------------------");
          Log.log().info(userPhone + "::---------------------------------------------------------------------------------------------------");
          Common.logEventAck(req, urlNameRequest, "INSERT", "ERROR", userPhone + "::tao don hang khong thanh cong resultCode: " + result);
          String message = jsonOutputResult.getString("message");
          model.put("code", Integer.valueOf(6642));
          model.put("message", message);
          model.put("data", "");
        } else {
          Log.log().info(userPhone + "::---------------------------------------------------------------------------------------------------");
          Log.log().info(userPhone + "::---------------------------------------------------------------------------------------------------");
          Common.logEventAck(req, urlNameRequest, "INSERT", "ERROR", userPhone + "::tao don hang khong thanh cong resultCode: " + result);
          model.put("code", Integer.valueOf(66));
          model.put("message", errDetailByResult(result));
          model.put("data", "");
        } 
      } 
    } catch (Exception e) {
      Log.log().error("SubmitController.submitCommonData ==> error : ", e);
    } 
    return model;
  }
  
  private static String errDetailByResult(int code) {
    String html = "Đơn hàng không hợp lệ";
    if (code == 21) {
      html = "Đơn hàng không đúng thời điểm, vui lòng thử lại";
    } else if (code == 34) {
      html = "Số điện thoại không hợp lệ, vui lòng kiểm tra lại đơn hàng";
    } else if (code == 35) {
      html = "Đơn hàng không hợp lệ, vui lòng kiểm tra lại đơn hàng";
    } else if (code == 42) {
      html = "Có vé trong đơn hàng thời gian quay thưởng không hợp lệ, vui lòng kiểm tra lại đơn hàng";
    } else if (code == 43) {
      html = "Số tiền của đơn hàng quá lớn, vui lòng kiểm tra lại đơn hàng";
    } else if (code == 44) {
      html = "Khoảng cách ship quá xa đại lý, vui lòng chọn địa điểm khác";
    } else if (code == 100) {
      html = "Thao tác quá nhanh, vui lòng thử lại trong giây lát";
    } else if (code == 254) {
      html = "Hệ thống tạm thời bận, vui lòng thử lại sau";
    } else if (code == 255) {
      html = "Lỗi không xác định, vui lòng kiểm tra lại đơn hàng";
    } 
    return html;
  }
}
