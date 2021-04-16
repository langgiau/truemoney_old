package com.elcom.model.action;

import com.elcom.common.Common;
import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class HistoryDetailPro {
  public JSONObject reportTickerErr(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_REPORT_TICKER_ERROR;
      objOutput = Common.commonPutForJsonObjectPHAVD_Momo(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("HistoryPro.reportTickerErr ==> error : ", e);
    } 
    return objOutput;
  }
}
