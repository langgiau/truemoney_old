package com.elcom.model.action;

import com.elcom.common.Common;
import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import java.util.Map;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class HistoryPro {
  public JSONObject getHistoryWaiting(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_VIEW_HISTORY_WAITING;
      objOutput = Common.commonPostForJsonObjectPHAVD_Momo(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("HistoryPro.getHistoryWaiting ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getHistoryTransDone(Map fields) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_VIEW_HISTORY_BUY_CANCEL + "?" + Common.buildUrlFields(fields);
      objOutput = Common.commonGetForJsonObjectPHAVD_Momo(urlConfig);
    } catch (Exception e) {
      Log.log().error("HistoryPro.getHistoryTransDone ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getHistoryKenoWaiting(Map fields) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_VIEW_HISTORY_KENO_WAITING + "?" + Common.buildUrlFields(fields);
      objOutput = Common.commonGetForJsonObjectPHAVD_Momo(urlConfig);
    } catch (Exception e) {
      Log.log().error("HistoryPro.getHistoryKenoWaiting ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject getHistoryKenoTransDone(Map fields) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_VIEW_HISTORY_KENO_BUY_CANCEL + "?" + Common.buildUrlFields(fields);
      objOutput = Common.commonGetForJsonObjectPHAVD_Momo(urlConfig);
    } catch (Exception e) {
      Log.log().error("HistoryPro.getHistoryKenoTransDone ==> error : ", e);
    } 
    return objOutput;
  }
}
