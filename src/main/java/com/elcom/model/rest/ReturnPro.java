package com.elcom.model.rest;

import com.elcom.common.Common;
import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import java.util.Random;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class ReturnPro {
  public JSONObject addMoneyPhaVD(long transId, String msisdn, double money) {
    JSONObject objOutput = null;
    try {
      JSONObject postInput = new JSONObject();
      postInput.put("transId", transId + "");
      postInput.put("subscriber", msisdn + "");
      postInput.put("balanceName", "Vietlott");
      postInput.put("amount", money + "");
      postInput.put("reasonCode", "NAP_TIEN");
      postInput.put("reasonDetail", "Nạp tiền từ napas");
      postInput.put("channel", "NAPAS");
      postInput.put("actor", "napas");
      postInput.put("requestId", (new Random()).nextInt(2147483647) + "");
      objOutput = Common.commonPostForJsonObjectPHAVD_Momo(Config.URL_SERVICES_BUY_ORDER, postInput);
    } catch (Exception e) {
      Log.log().error("ReturnPro.addMoneyPhaVD ==> error : ", e);
    } 
    return objOutput;
  }
}
