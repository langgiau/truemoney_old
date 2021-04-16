package com.elcom.controller.action;

import com.elcom.common.Common;
import com.elcom.config.web.Log;
import com.elcom.model.action.CommonPro;
import com.elcom.model.action.HistoryPro;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
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
@RequestMapping({"/action/history"})
public class HistoryController {
  @Autowired
  CommonPro commonPro;
  
  @Autowired
  HistoryPro historyPro;
  
  private static String urlNameRequest = "/action/history";
  
  @RequestMapping(value = {"/getHistoryWaiting"}, method = {RequestMethod.POST})
  public Map<String, Object> getHistoryWaiting(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonCustomerInfo = new JSONObject();
      jsonCustomerInfo.put("address", "");
      jsonCustomerInfo.put("customerName", "");
      jsonCustomerInfo.put("lat", "0.0");
      jsonCustomerInfo.put("lng", "0.0");
      jsonCustomerInfo.put("phoneNumber", Common.commonGetMsisdnLogin(req));
      JSONObject jsonDataInput = new JSONObject();
      jsonDataInput.put("customerInfo", jsonCustomerInfo);
      jsonDataInput.put("fromOrderMoney", "0");
      jsonDataInput.put("orderStatus", "1,2");
      jsonDataInput.put("requestId", "-416501003");
      jsonDataInput.put("ticketCategory", "-1");
      jsonDataInput.put("toOrderMoney", "0.0");
      JSONObject jsonOutput = this.historyPro.getHistoryWaiting(jsonDataInput);
      JSONArray listAll = new JSONArray();
      if (jsonOutput != null && 
        !jsonOutput.isNull("paperTicketOrderInfos"))
        listAll = jsonOutput.getJSONArray("paperTicketOrderInfos"); 
      model.put("code", Integer.valueOf(0));
      model.put("data", listAll.toList());
    } catch (Exception e) {
      Log.log().error("HistoryController.getHistoryWaiting ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getHistoryTransDone"}, method = {RequestMethod.POST})
  public Map<String, Object> getHistoryTransDone(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String optStatus = jsonInput.getString("optStatus");
      String page_index = jsonInput.getString("page_index");
      Map<Object, Object> paramInput = new LinkedHashMap<>();
      paramInput.put("msisdn", Common.commonGetMsisdnLogin(req));
      paramInput.put("status", optStatus + "");
      paramInput.put("page_index", page_index);
      paramInput.put("page_size", "10");
      JSONObject jsonOutput = this.historyPro.getHistoryTransDone(paramInput);
      JSONArray listAll = new JSONArray();
      if (jsonOutput != null && 
        !jsonOutput.isNull("paperTicketOrderInfos"))
        listAll = jsonOutput.getJSONArray("paperTicketOrderInfos"); 
      model.put("code", Integer.valueOf(0));
      model.put("data", listAll.toList());
    } catch (Exception e) {
      Log.log().error("HistoryController.getHistoryTransDone ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getHistoryKenoWaiting"}, method = {RequestMethod.POST})
  public Map<String, Object> getHistoryKenoWaiting(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String optStatus = jsonInput.getString("optStatus");
      String page_index = jsonInput.getString("page_index");
      Map<Object, Object> paramInput = new LinkedHashMap<>();
      paramInput.put("msisdn", Common.commonGetMsisdnLogin(req));
      paramInput.put("status", optStatus + "");
      paramInput.put("page_index", page_index);
      paramInput.put("page_size", "10");
      JSONObject jsonOutput = this.historyPro.getHistoryKenoWaiting(paramInput);
      JSONArray listAll = new JSONArray();
      if (jsonOutput != null && 
        !jsonOutput.isNull("paperTicketOrderInfos"))
        listAll = jsonOutput.getJSONArray("paperTicketOrderInfos"); 
      model.put("code", Integer.valueOf(0));
      model.put("data", listAll.toList());
    } catch (Exception e) {
      Log.log().error("HistoryController.getHistoryKenoWaiting ==> error : ", e);
    } 
    return model;
  }
  
  @RequestMapping(value = {"/getHistoryKenoTransDone"}, method = {RequestMethod.POST})
  public Map<String, Object> getHistoryKenoTransDone(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new ArrayList());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String optStatus = jsonInput.getString("optStatus");
      String page_index = jsonInput.getString("page_index");
      Map<Object, Object> paramInput = new LinkedHashMap<>();
      paramInput.put("msisdn", Common.commonGetMsisdnLogin(req));
      paramInput.put("status", optStatus + "");
      paramInput.put("page_index", page_index);
      paramInput.put("page_size", "10");
      JSONObject jsonOutput = this.historyPro.getHistoryKenoTransDone(paramInput);
      JSONArray listAll = new JSONArray();
      if (jsonOutput != null && 
        !jsonOutput.isNull("paperTicketOrderInfos"))
        listAll = jsonOutput.getJSONArray("paperTicketOrderInfos"); 
      model.put("code", Integer.valueOf(0));
      model.put("data", listAll.toList());
    } catch (Exception e) {
      Log.log().error("HistoryController.getHistoryKenoTransDone ==> error : ", e);
    } 
    return model;
  }
}
