package com.elcom.controller.rest;

import com.elcom.common.Common;
import com.elcom.config.web.Log;
import com.elcom.utils.ShaFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping({"/action/return"})
public class ReturnController {
  private static String urlNameRequest = "/action/return";
  
  @RequestMapping(value = {"/success"}, method = {RequestMethod.GET})
  public String process(HttpServletRequest request, RedirectAttributes model) {
    model.addFlashAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    model.addFlashAttribute("momoResult", "<code>Giao dịch không hợp lệ</code>");
    try {
      Log.log().info("----------------------------------- return data : ");
      Map<Object, Object> fields = new HashMap<>();
      for (Enumeration<String> enum1 = request.getParameterNames(); enum1.hasMoreElements(); ) {
        String fieldName = enum1.nextElement();
        String fieldValue = request.getParameter(fieldName);
        if (fieldValue != null && fieldValue.length() > 0) {
          fields.put(fieldName, fieldValue);
          Log.log().info(fieldName + " : " + fieldValue);
        } 
      } 
      Log.log().info("----------------------------------- return data end");
      String momoSignature = (String)fields.remove("signature");
      Log.log().info("--------- fields size : " + fields.size());
      String partnerCode = request.getParameter("partnerCode");
      String accessKey = request.getParameter("accessKey");
      String requestId = request.getParameter("requestId");
      String amount = request.getParameter("amount");
      String orderId = request.getParameter("orderId");
      String orderInfo = request.getParameter("orderInfo");
      String orderType = request.getParameter("orderType");
      String transId = request.getParameter("transId");
      String message = request.getParameter("message");
      String localMessage = request.getParameter("localMessage");
      String responseTime = request.getParameter("responseTime");
      String errorCode = request.getParameter("errorCode");
      String payType = request.getParameter("payType");
      String extraData = request.getParameter("extraData");
      Map<Object, Object> fieldsCustum = new LinkedHashMap<>();
      fieldsCustum.put("partnerCode", partnerCode);
      fieldsCustum.put("accessKey", accessKey);
      fieldsCustum.put("requestId", requestId);
      fieldsCustum.put("amount", amount);
      fieldsCustum.put("orderId", orderId);
      fieldsCustum.put("orderInfo", orderInfo);
      fieldsCustum.put("orderType", orderType);
      fieldsCustum.put("transId", transId);
      fieldsCustum.put("message", message);
      fieldsCustum.put("localMessage", localMessage);
      fieldsCustum.put("responseTime", responseTime);
      fieldsCustum.put("errorCode", errorCode);
      fieldsCustum.put("payType", payType);
      fieldsCustum.put("extraData", extraData);
      String checksumSignature = ShaFormat.encodeSignature(fieldsCustum);
      Log.log().info("momoSignature : " + momoSignature);
      Log.log().info("checksumSignature : " + checksumSignature);
      if (checksumSignature.equalsIgnoreCase(momoSignature)) {
        model.addFlashAttribute("cusAmount", String.format("%, .0f", new Object[] { Double.valueOf(Common.parseDoubleStr(amount)) }) + " đồng");
        model.addFlashAttribute("cusOrderInfo", orderInfo);
        model.addFlashAttribute("cusResponseTime", responseTime);
        model.addFlashAttribute("cusTransId", transId);
        if (errorCode.equals("0")) {
          model.addFlashAttribute("momoResult", "<span class='textColorBlue'>Giao dịch thành công</span>");
        } else {
          model.addFlashAttribute("momoResult", "<code>" + localMessage + "</code>");
        } 
      } 
    } catch (Exception e) {
      Log.log().error("ReturnController.process ==> error : ", e);
    } 
    return "redirect:/home";
  }
  
  @RequestMapping(value = {"/info"}, method = {RequestMethod.GET})
  public String info() {
    return "info";
  }
}
