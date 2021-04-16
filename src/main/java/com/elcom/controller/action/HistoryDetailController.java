package com.elcom.controller.action;

import com.elcom.config.web.Log;
import com.elcom.model.action.HistoryDetailPro;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
@RequestMapping({"/action/history/detail"})
public class HistoryDetailController {
  @Autowired
  HistoryDetailPro historyDetailPro;
  
  private static String urlNameRequest = "/action/history/detail";
  
  @RequestMapping(value = {"/reportTickerErr"}, method = {RequestMethod.POST})
  public Map<String, Object> reportTickerErr(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("data", new String());
    try {
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String paperTicketId = jsonInput.getString("paperTicketId");
      String message = jsonInput.getString("message");
      JSONObject jsonDataInput = new JSONObject();
      jsonDataInput.put("paperTicketId", paperTicketId + "");
      jsonDataInput.put("message", message + "");
      JSONObject jsonOutput = this.historyDetailPro.reportTickerErr(jsonDataInput);
      if (jsonOutput != null) {
        int result = jsonOutput.getInt("result");
        String resultDesc = jsonOutput.getString("resultDesc");
        model.put("code", Integer.valueOf(result));
        model.put("data", resultDesc);
      } 
    } catch (Exception e) {
      Log.log().error("HistoryDetailController.reportTickerErr ==> error : ", e);
    } 
    return model;
  }
}
