package com.elcom.model.action;

import com.elcom.common.Common;
import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import com.elcom.dto.CustomerInfoDTO;
import com.elcom.dto.ReceiverInfoDTO;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class SubmitPro {
  public JSONObject orderTickerPhaVD_Momo(String userPhone, String deliveryType, String orderArrPower655, String orderArrMega645, String orderArrMax4D, String orderArrMax3D, String orderArrMax3DPlus, String orderArrOmMax3DPlus, String orderArrBulk, String orderArrKeno, CustomerInfoDTO customerInfoDTO, ReceiverInfoDTO receiverInfoDTO) {
    JSONObject objOutput = null;
    try {
      JSONObject postInput = buildObjSendPhaVD(deliveryType, orderArrPower655, orderArrMega645, orderArrMax4D, orderArrMax3D, orderArrMax3DPlus, orderArrOmMax3DPlus, orderArrBulk, orderArrKeno, customerInfoDTO, receiverInfoDTO);
      Log.log().info(userPhone + "::---------------------------- build send a phaVD : ");
      Log.log().info(userPhone + "::" + orderArrKeno);
      Log.log().info(userPhone + "::" + postInput.toString());
      Log.log().info(userPhone + "::-------------------------------------------------------------");
      objOutput = Common.commonPostForJsonObjectPHAVD_Momo(Config.URL_SERVICES_BUY_ORDER, postInput);
      Log.log().info(userPhone + "::output:  " + objOutput);
    } catch (Exception e) {
      Log.log().error("ReturnPro.orderTickerPhaVD ==> error : ", e);
    } 
    return objOutput;
  }
  
  public JSONObject orderTickerServer_Momo(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      objOutput = Common.commonPostForJsonObjectPHAVD(Config.MOMO_API_URL, postInput);
    } catch (Exception e) {
      Log.log().error("ReturnPro.orderTickerPhaVD ==> error : ", e);
    } 
    return objOutput;
  }
  
  private static JSONObject buildObjSendPhaVD(String deliveryType, String orderArrPower655, String orderArrMega645, String orderArrMax4D, String orderArrMax3D, String orderArrMax3DPlus, String orderArrOmMax3DPlus, String orderArrBulk, String orderArrKeno, CustomerInfoDTO customerInfoDTO, ReceiverInfoDTO receiverInfoDTO) {
    JSONObject jsonOut = new JSONObject();
    try {
      double countAllMoneyTotal = 0.0D;
      JSONArray orderItemInfosArr = new JSONArray();
      JSONArray jsonInputParsePower655 = new JSONArray();
      JSONArray jsonInputParseMega645 = new JSONArray();
      JSONArray jsonInputParseMax4D = new JSONArray();
      JSONArray jsonInputParseMax3D = new JSONArray();
      JSONArray jsonInputParseMax3DPlus = new JSONArray();
      JSONArray jsonInputParseOmMax3DPlus = new JSONArray();
      JSONArray jsonInputParseBulk = new JSONArray();
      JSONArray jsonInputParseKeno = new JSONArray();
      if (orderArrPower655 != null && !orderArrPower655.equals(""))
        jsonInputParsePower655 = new JSONArray(orderArrPower655); 
      if (orderArrMega645 != null && !orderArrMega645.equals(""))
        jsonInputParseMega645 = new JSONArray(orderArrMega645); 
      if (orderArrMax4D != null && !orderArrMax4D.equals(""))
        jsonInputParseMax4D = new JSONArray(orderArrMax4D); 
      if (orderArrMax3D != null && !orderArrMax3D.equals(""))
        jsonInputParseMax3D = new JSONArray(orderArrMax3D); 
      if (orderArrMax3DPlus != null && !orderArrMax3DPlus.equals(""))
        jsonInputParseMax3DPlus = new JSONArray(orderArrMax3DPlus); 
      if (orderArrOmMax3DPlus != null && !orderArrOmMax3DPlus.equals(""))
        jsonInputParseOmMax3DPlus = new JSONArray(orderArrOmMax3DPlus); 
      if (orderArrBulk != null && !orderArrBulk.equals(""))
        jsonInputParseBulk = new JSONArray(orderArrBulk); 
      if (orderArrKeno != null && !orderArrKeno.equals("") && !orderArrKeno.equals("[]"))
        jsonInputParseKeno = new JSONArray(orderArrKeno); 
      Log.log().info("tunv::---------------------------- : ");
      Log.log().info("orderArrKeno::" + orderArrKeno);
      Log.log().info("jsonInputParseKeno::" + jsonInputParseKeno);
      Log.log().info("countAllMoneyTotal::" + countAllMoneyTotal);
      Log.log().info("tunv::-------------------------------------------------------------");
      if (orderArrKeno != null && !orderArrKeno.equals("") && !orderArrKeno.equals("[]")) {
        countAllMoneyTotal = buildDataKenoTotal(countAllMoneyTotal, orderItemInfosArr, jsonInputParseKeno);
      } else {
        countAllMoneyTotal = buildDataPower655Total(countAllMoneyTotal, orderItemInfosArr, jsonInputParsePower655);
        countAllMoneyTotal = buildDataMega645Total(countAllMoneyTotal, orderItemInfosArr, jsonInputParseMega645);
        countAllMoneyTotal = buildDataMax4DTotal(countAllMoneyTotal, orderItemInfosArr, jsonInputParseMax4D);
        countAllMoneyTotal = buildDataMax3DTotal(countAllMoneyTotal, orderItemInfosArr, jsonInputParseMax3D);
        countAllMoneyTotal = buildDataMax3DPlusTotal(countAllMoneyTotal, orderItemInfosArr, jsonInputParseMax3DPlus);
        countAllMoneyTotal = buildDataOmMax3DPlusTotal(countAllMoneyTotal, orderItemInfosArr, jsonInputParseOmMax3DPlus);
        countAllMoneyTotal = buildDataBulkTotal(countAllMoneyTotal, orderItemInfosArr, jsonInputParseBulk);
      } 
      if (jsonInputParseBulk.length() > 0)
        deliveryType = "1"; 
      jsonOut.put("requestId", (new Random()).nextInt(2147483647) + "");
      jsonOut.put("orderTime", Common.formatDateToStr(new Date(), "dd/MM/yyyy HH:mm:ss") + "");
      jsonOut.put("temporaryAmount", Common.commonFormatMoney(countAllMoneyTotal));
      if (orderArrKeno != null && !orderArrKeno.equals("") && !orderArrKeno.equals("[]")) {
        jsonOut.put("paymentVendor", "42");
      } else {
        jsonOut.put("paymentVendor", "40");
      } 
      jsonOut.put("deliveryType", deliveryType);
      JSONObject customerInfo = new JSONObject();
      customerInfo.put("customerName", customerInfoDTO.getCustomerName());
      customerInfo.put("phoneNumber", customerInfoDTO.getPhoneNumber());
      customerInfo.put("address", customerInfoDTO.getAddress());
      customerInfo.put("lat", customerInfoDTO.getLat());
      customerInfo.put("lng", customerInfoDTO.getLng());
      JSONObject receiverInfo = new JSONObject();
      receiverInfo.put("cmnd", receiverInfoDTO.getCmnd());
      receiverInfo.put("name", receiverInfoDTO.getName());
      receiverInfo.put("phone", receiverInfoDTO.getPhone());
      receiverInfo.put("address", receiverInfoDTO.getAddress());
      receiverInfo.put("lat", receiverInfoDTO.getLat());
      receiverInfo.put("lng", receiverInfoDTO.getLng());
      jsonOut.put("customerInfo", customerInfo);
      jsonOut.put("receiverInfo", receiverInfo);
      jsonOut.put("orderItemInfos", orderItemInfosArr);
    } catch (Exception e) {
      Log.log().error("SubmitPro.buildObjSendPhaVD ==> error : ", e);
    } 
    return jsonOut;
  }
  
  private static double buildDataKenoTotal(double countAllMoneyTotal, JSONArray orderItemInfosArr, JSONArray jsonInputParseKeno) {
    for (int k = 0; k < jsonInputParseKeno.length(); k++) {
      JSONObject tickerOne = jsonInputParseKeno.getJSONObject(k);
      JSONArray dataNumber = tickerOne.getJSONArray("data");
      JSONArray arrKymua = tickerOne.getJSONArray("arr_ky_mua");
      JSONObject orderItemOne = new JSONObject();
      orderItemOne.put("group", tickerOne.getString("loai_bao"));
      orderItemOne.put("period", "0");
      orderItemOne.put("category", "6");
      JSONArray drawInfosArr = new JSONArray();
      for (int kk = 0; kk < arrKymua.length(); kk++) {
        JSONObject objKymua = arrKymua.getJSONObject(kk);
        JSONObject drawInfoOne = new JSONObject();
        drawInfoOne.put("drawId", objKymua.getString("drawCode"));
        drawInfoOne.put("openDate", objKymua.getString("openDate"));
        drawInfosArr.put(drawInfoOne);
      } 
      orderItemOne.put("drawInfos", drawInfosArr);
      double countMoneyOne = 0.0D;
      JSONArray numberInfosArr = new JSONArray();
      for (int kkk = 0; kkk < dataNumber.length(); kkk++) {
        JSONObject objDataOne = dataNumber.getJSONObject(kkk);
        countMoneyOne += Double.parseDouble(objDataOne.getString("money")) * 10000.0D;
        JSONObject numberInfoOne = new JSONObject();
        JSONArray oneNumber = objDataOne.getJSONArray("value");
        numberInfoOne.put("priceUnit", objDataOne.getString("money"));
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", objDataOne.getJSONArray("value"));
        numberInfosArr.put(numberInfoOne);
      } 
      countAllMoneyTotal += countMoneyOne;
      orderItemOne.put("numberInfos", numberInfosArr);
      orderItemInfosArr.put(orderItemOne);
    } 
    return countAllMoneyTotal;
  }
  
  private static double buildDataPower655Total(double countAllMoneyTotal, JSONArray orderItemInfosArr, JSONArray jsonInputParsePower655) {
    for (int k = 0; k < jsonInputParsePower655.length(); k++) {
      JSONObject tickerOne = jsonInputParsePower655.getJSONObject(k);
      JSONArray dataNumber = tickerOne.getJSONArray("data");
      JSONArray arrKymua = tickerOne.getJSONArray("arr_ky_mua");
      JSONObject orderItemOne = new JSONObject();
      orderItemOne.put("group", tickerOne.getString("loai_bao"));
      orderItemOne.put("period", "0");
      orderItemOne.put("category", "3");
      JSONArray drawInfosArr = new JSONArray();
      for (int kk = 0; kk < arrKymua.length(); kk++) {
        JSONObject objKymua = arrKymua.getJSONObject(kk);
        JSONObject drawInfoOne = new JSONObject();
        drawInfoOne.put("drawId", objKymua.getString("drawCode"));
        drawInfoOne.put("openDate", objKymua.getString("openDate"));
        drawInfosArr.put(drawInfoOne);
      } 
      orderItemOne.put("drawInfos", drawInfosArr);
      double countMoneyOne = 0.0D;
      JSONArray numberInfosArr = new JSONArray();
      for (int kkk = 0; kkk < dataNumber.length(); kkk++) {
        JSONObject objDataOne = dataNumber.getJSONObject(kkk);
        countMoneyOne += Common.commonMoneyPower655(objDataOne.getJSONArray("value").length());
        JSONObject numberInfoOne = new JSONObject();
        numberInfoOne.put("priceUnit", "1");
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", objDataOne.getJSONArray("value"));
        numberInfosArr.put(numberInfoOne);
      } 
      countMoneyOne *= arrKymua.length();
      countAllMoneyTotal += countMoneyOne;
      orderItemOne.put("numberInfos", numberInfosArr);
      orderItemInfosArr.put(orderItemOne);
    } 
    return countAllMoneyTotal;
  }
  
  private static double buildDataMega645Total(double countAllMoneyTotal, JSONArray orderItemInfosArr, JSONArray jsonInputParseMega645) {
    for (int k = 0; k < jsonInputParseMega645.length(); k++) {
      JSONObject tickerOne = jsonInputParseMega645.getJSONObject(k);
      JSONArray dataNumber = tickerOne.getJSONArray("data");
      JSONArray arrKymua = tickerOne.getJSONArray("arr_ky_mua");
      JSONObject orderItemOne = new JSONObject();
      orderItemOne.put("group", tickerOne.getString("loai_bao"));
      orderItemOne.put("period", "0");
      orderItemOne.put("category", "1");
      JSONArray drawInfosArr = new JSONArray();
      for (int kk = 0; kk < arrKymua.length(); kk++) {
        JSONObject objKymua = arrKymua.getJSONObject(kk);
        JSONObject drawInfoOne = new JSONObject();
        drawInfoOne.put("drawId", objKymua.getString("drawCode"));
        drawInfoOne.put("openDate", objKymua.getString("openDate"));
        drawInfosArr.put(drawInfoOne);
      } 
      orderItemOne.put("drawInfos", drawInfosArr);
      double countMoneyOne = 0.0D;
      JSONArray numberInfosArr = new JSONArray();
      for (int kkk = 0; kkk < dataNumber.length(); kkk++) {
        JSONObject objDataOne = dataNumber.getJSONObject(kkk);
        countMoneyOne += Common.commonMoneyMega645(objDataOne.getJSONArray("value").length());
        JSONObject numberInfoOne = new JSONObject();
        numberInfoOne.put("priceUnit", "1");
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", objDataOne.getJSONArray("value"));
        numberInfosArr.put(numberInfoOne);
      } 
      countMoneyOne *= arrKymua.length();
      countAllMoneyTotal += countMoneyOne;
      orderItemOne.put("numberInfos", numberInfosArr);
      orderItemInfosArr.put(orderItemOne);
    } 
    return countAllMoneyTotal;
  }
  
  private static double buildDataMax4DTotal(double countAllMoneyTotal, JSONArray orderItemInfosArr, JSONArray jsonInputParseMax4D) {
    for (int k = 0; k < jsonInputParseMax4D.length(); k++) {
      JSONObject tickerOne = jsonInputParseMax4D.getJSONObject(k);
      JSONArray dataNumber = tickerOne.getJSONArray("data");
      JSONArray arrKymua = tickerOne.getJSONArray("arr_ky_mua");
      JSONObject orderItemOne = new JSONObject();
      orderItemOne.put("group", tickerOne.getString("loai_bao"));
      orderItemOne.put("period", "0");
      orderItemOne.put("category", "2");
      JSONArray drawInfosArr = new JSONArray();
      for (int kk = 0; kk < arrKymua.length(); kk++) {
        JSONObject objKymua = arrKymua.getJSONObject(kk);
        JSONObject drawInfoOne = new JSONObject();
        drawInfoOne.put("drawId", objKymua.getString("drawCode"));
        drawInfoOne.put("openDate", objKymua.getString("openDate"));
        drawInfosArr.put(drawInfoOne);
      } 
      orderItemOne.put("drawInfos", drawInfosArr);
      double countMoneyOne = 0.0D;
      JSONArray numberInfosArr = new JSONArray();
      for (int kkk = 0; kkk < dataNumber.length(); kkk++) {
        JSONObject objDataOne = dataNumber.getJSONObject(kkk);
        countMoneyOne += Double.parseDouble(objDataOne.getString("money")) * 10000.0D;
        JSONObject numberInfoOne = new JSONObject();
        JSONArray oneNumber = objDataOne.getJSONArray("value");
        String numberTxt = "";
        JSONArray oneNumberBuild = new JSONArray();
        for (int gku = 0; gku < oneNumber.length(); gku++)
          numberTxt = numberTxt + oneNumber.getInt(gku); 
        oneNumberBuild.put(Integer.parseInt(numberTxt));
        numberInfoOne.put("priceUnit", objDataOne.getString("money"));
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", oneNumberBuild);
        numberInfosArr.put(numberInfoOne);
      } 
      countAllMoneyTotal += countMoneyOne;
      orderItemOne.put("numberInfos", numberInfosArr);
      orderItemInfosArr.put(orderItemOne);
    } 
    return countAllMoneyTotal;
  }
  
  private static double buildDataMax3DTotal(double countAllMoneyTotal, JSONArray orderItemInfosArr, JSONArray jsonInputParseMax3D) {
    for (int k = 0; k < jsonInputParseMax3D.length(); k++) {
      JSONObject tickerOne = jsonInputParseMax3D.getJSONObject(k);
      JSONArray dataNumber = tickerOne.getJSONArray("data");
      JSONArray arrKymua = tickerOne.getJSONArray("arr_ky_mua");
      JSONObject orderItemOne = new JSONObject();
      orderItemOne.put("group", tickerOne.getString("loai_bao"));
      orderItemOne.put("period", "0");
      orderItemOne.put("category", "4");
      JSONArray drawInfosArr = new JSONArray();
      for (int kk = 0; kk < arrKymua.length(); kk++) {
        JSONObject objKymua = arrKymua.getJSONObject(kk);
        JSONObject drawInfoOne = new JSONObject();
        drawInfoOne.put("drawId", objKymua.getString("drawCode"));
        drawInfoOne.put("openDate", objKymua.getString("openDate"));
        drawInfosArr.put(drawInfoOne);
      } 
      orderItemOne.put("drawInfos", drawInfosArr);
      double countMoneyOne = 0.0D;
      JSONArray numberInfosArr = new JSONArray();
      for (int kkk = 0; kkk < dataNumber.length(); kkk++) {
        JSONObject objDataOne = dataNumber.getJSONObject(kkk);
        countMoneyOne += Double.parseDouble(objDataOne.getString("money")) * 10000.0D;
        JSONObject numberInfoOne = new JSONObject();
        JSONArray oneNumber = objDataOne.getJSONArray("value");
        String numberTxt = "";
        JSONArray oneNumberBuild = new JSONArray();
        for (int gku = 0; gku < oneNumber.length(); gku++)
          numberTxt = numberTxt + oneNumber.getInt(gku); 
        oneNumberBuild.put(Integer.parseInt(numberTxt));
        numberInfoOne.put("priceUnit", objDataOne.getString("money"));
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", oneNumberBuild);
        numberInfosArr.put(numberInfoOne);
      } 
      countAllMoneyTotal += countMoneyOne;
      orderItemOne.put("numberInfos", numberInfosArr);
      orderItemInfosArr.put(orderItemOne);
    } 
    return countAllMoneyTotal;
  }
  
  private static double buildDataMax3DPlusTotal(double countAllMoneyTotal, JSONArray orderItemInfosArr, JSONArray jsonInputParseMax3DPlus) {
    for (int k = 0; k < jsonInputParseMax3DPlus.length(); k++) {
      JSONObject tickerOne = jsonInputParseMax3DPlus.getJSONObject(k);
      JSONArray dataNumber = tickerOne.getJSONArray("data");
      JSONArray arrKymua = tickerOne.getJSONArray("arr_ky_mua");
      JSONObject orderItemOne = new JSONObject();
      orderItemOne.put("group", tickerOne.getString("loai_bao"));
      orderItemOne.put("period", "0");
      orderItemOne.put("category", "5");
      JSONArray drawInfosArr = new JSONArray();
      for (int kk = 0; kk < arrKymua.length(); kk++) {
        JSONObject objKymua = arrKymua.getJSONObject(kk);
        JSONObject drawInfoOne = new JSONObject();
        drawInfoOne.put("drawId", objKymua.getString("drawCode"));
        drawInfoOne.put("openDate", objKymua.getString("openDate"));
        drawInfosArr.put(drawInfoOne);
      } 
      orderItemOne.put("drawInfos", drawInfosArr);
      double countMoneyOne = 0.0D;
      JSONArray numberInfosArr = new JSONArray();
      for (int kkk = 0; kkk < dataNumber.length(); kkk++) {
        JSONObject objDataOne = dataNumber.getJSONObject(kkk);
        countMoneyOne += Double.parseDouble(objDataOne.getString("money")) * 10000.0D;
        JSONObject numberInfoOne = new JSONObject();
        JSONArray oneNumber = objDataOne.getJSONArray("value");
        String numberTxt1 = "";
        String numberTxt2 = "";
        JSONArray oneNumberBuild = new JSONArray();
        for (int gku = 0; gku < oneNumber.length(); gku++) {
          if (gku < 3) {
            numberTxt1 = numberTxt1 + oneNumber.getInt(gku);
          } else {
            numberTxt2 = numberTxt2 + oneNumber.getInt(gku);
          } 
        } 
        oneNumberBuild.put(Integer.parseInt(numberTxt1));
        oneNumberBuild.put(Integer.parseInt(numberTxt2));
        numberInfoOne.put("priceUnit", objDataOne.getString("money"));
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", oneNumberBuild);
        numberInfosArr.put(numberInfoOne);
      } 
      countAllMoneyTotal += countMoneyOne;
      orderItemOne.put("numberInfos", numberInfosArr);
      orderItemInfosArr.put(orderItemOne);
    } 
    return countAllMoneyTotal;
  }
  
  private static double buildDataBulkTotal(double countAllMoneyTotal, JSONArray orderItemInfosArr, JSONArray jsonInputParseBulk) {
    for (int k = 0; k < jsonInputParseBulk.length(); k++) {
      JSONObject tickerOne = jsonInputParseBulk.getJSONObject(k);
      int loaiVe = tickerOne.getInt("loai_ve");
      JSONObject objDataNumber = tickerOne.getJSONObject("data");
      JSONArray arrKymua = tickerOne.getJSONArray("arr_ky_mua");
      if (loaiVe == 13) {
        JSONObject orderItemOne = new JSONObject();
        orderItemOne.put("group", "6");
        orderItemOne.put("period", "0");
        orderItemOne.put("category", loaiVe + "");
        JSONArray drawInfosArr = new JSONArray();
        for (int kk = 0; kk < arrKymua.length(); kk++) {
          JSONObject objKymua = arrKymua.getJSONObject(kk);
          JSONObject drawInfoOne = new JSONObject();
          drawInfoOne.put("drawId", objKymua.getString("drawCode"));
          drawInfoOne.put("openDate", objKymua.getString("openDate"));
          drawInfosArr.put(drawInfoOne);
        } 
        orderItemOne.put("drawInfos", drawInfosArr);
        double countMoneyOne = 0.0D;
        JSONArray numberInfosArr = new JSONArray();
        countMoneyOne += objDataNumber.getDouble("giatien_all");
        ArrayList<Integer> arrDataOneNumbers = new ArrayList();
        arrDataOneNumbers.add(Integer.valueOf(objDataNumber.getInt("s_l_ve")));
        arrDataOneNumbers.add(Integer.valueOf(objDataNumber.getInt("s_l_bs_1_ve")));
        JSONObject numberInfoOne = new JSONObject();
        numberInfoOne.put("priceUnit", "1");
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", arrDataOneNumbers.toArray());
        numberInfosArr.put(numberInfoOne);
        countAllMoneyTotal += countMoneyOne;
        orderItemOne.put("numberInfos", numberInfosArr);
        orderItemInfosArr.put(orderItemOne);
      } else if (loaiVe == 11) {
        JSONObject orderItemOne = new JSONObject();
        orderItemOne.put("group", "6");
        orderItemOne.put("period", "0");
        orderItemOne.put("category", loaiVe + "");
        JSONArray drawInfosArr = new JSONArray();
        for (int kk = 0; kk < arrKymua.length(); kk++) {
          JSONObject objKymua = arrKymua.getJSONObject(kk);
          JSONObject drawInfoOne = new JSONObject();
          drawInfoOne.put("drawId", objKymua.getString("drawCode"));
          drawInfoOne.put("openDate", objKymua.getString("openDate"));
          drawInfosArr.put(drawInfoOne);
        } 
        orderItemOne.put("drawInfos", drawInfosArr);
        double countMoneyOne = 0.0D;
        JSONArray numberInfosArr = new JSONArray();
        countMoneyOne += objDataNumber.getDouble("giatien_all");
        ArrayList<Integer> arrDataOneNumbers = new ArrayList();
        arrDataOneNumbers.add(Integer.valueOf(objDataNumber.getInt("s_l_ve")));
        arrDataOneNumbers.add(Integer.valueOf(objDataNumber.getInt("s_l_bs_1_ve")));
        JSONObject numberInfoOne = new JSONObject();
        numberInfoOne.put("priceUnit", "1");
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", arrDataOneNumbers.toArray());
        numberInfosArr.put(numberInfoOne);
        countAllMoneyTotal += countMoneyOne;
        orderItemOne.put("numberInfos", numberInfosArr);
        orderItemInfosArr.put(orderItemOne);
      } else if (loaiVe == 12) {
        JSONObject orderItemOne = new JSONObject();
        orderItemOne.put("group", objDataNumber.getInt("cachchoi_max4d") + "");
        orderItemOne.put("period", "0");
        orderItemOne.put("category", loaiVe + "");
        JSONArray drawInfosArr = new JSONArray();
        for (int kk = 0; kk < arrKymua.length(); kk++) {
          JSONObject objKymua = arrKymua.getJSONObject(kk);
          JSONObject drawInfoOne = new JSONObject();
          drawInfoOne.put("drawId", objKymua.getString("drawCode"));
          drawInfoOne.put("openDate", objKymua.getString("openDate"));
          drawInfosArr.put(drawInfoOne);
        } 
        orderItemOne.put("drawInfos", drawInfosArr);
        double countMoneyOne = 0.0D;
        JSONArray numberInfosArr = new JSONArray();
        countMoneyOne += objDataNumber.getDouble("giatien_all");
        JSONObject numberInfoOne = new JSONObject();
        ArrayList<Integer> arrDataOneNumbers = new ArrayList();
        arrDataOneNumbers.add(Integer.valueOf(objDataNumber.getInt("s_l_ve")));
        arrDataOneNumbers.add(Integer.valueOf(objDataNumber.getInt("s_l_bs_1_ve")));
        numberInfoOne.put("priceUnit", objDataNumber.getInt("giatien_1_ve") + "");
        numberInfoOne.put("chosenAuto", "1");
        numberInfoOne.put("numbers", arrDataOneNumbers.toArray());
        numberInfosArr.put(numberInfoOne);
        countAllMoneyTotal += countMoneyOne;
        orderItemOne.put("numberInfos", numberInfosArr);
        orderItemInfosArr.put(orderItemOne);
      } 
    } 
    return countAllMoneyTotal;
  }
  
  private static double buildDataOmMax3DPlusTotal(double countAllMoneyTotal, JSONArray orderItemInfosArr, JSONArray jsonInputParseOmMax3DPlus) {
    try {
      for (int k = 0; k < jsonInputParseOmMax3DPlus.length(); k++) {
        JSONObject tickerOne = jsonInputParseOmMax3DPlus.getJSONObject(k);
        JSONObject dataNumber = tickerOne.getJSONObject("data");
        JSONArray arrKymua = tickerOne.getJSONArray("arr_ky_mua");
        int from = Integer.parseInt(dataNumber.getString("giaiSoFrom"));
        int to = Integer.parseInt(dataNumber.getString("giaiSoTo"));
        int dongia = Integer.parseInt(tickerOne.getString("loai_bao"));
        if (to - from + 9 >= 0) {
          JSONObject orderItemOne = new JSONObject();
          orderItemOne.put("group", "6");
          orderItemOne.put("period", "0");
          orderItemOne.put("category", "15");
          JSONArray drawInfosArr = new JSONArray();
          for (int kk = 0; kk < arrKymua.length(); kk++) {
            JSONObject objKymua = arrKymua.getJSONObject(kk);
            JSONObject drawInfoOne = new JSONObject();
            drawInfoOne.put("drawId", objKymua.getString("drawCode"));
            drawInfoOne.put("openDate", objKymua.getString("openDate"));
            drawInfosArr.put(drawInfoOne);
          } 
          orderItemOne.put("drawInfos", drawInfosArr);
          double countMoneyOne = 0.0D;
          JSONArray numberInfosArr = new JSONArray();
          for (int kkk = 0; kkk < 1; kkk++) {
            JSONObject numberInfoOne = new JSONObject();
            JSONArray oneNumberBuild = new JSONArray();
            oneNumberBuild.put(Integer.parseInt(dataNumber.getString("soTuChon")));
            oneNumberBuild.put(from);
            oneNumberBuild.put(to);
            countMoneyOne = ((to - from + 1) * dongia * 10000 * arrKymua.length());
            numberInfoOne.put("priceUnit", dongia + "");
            numberInfoOne.put("chosenAuto", "0");
            numberInfoOne.put("numbers", oneNumberBuild);
            numberInfosArr.put(numberInfoOne);
          } 
          countAllMoneyTotal += countMoneyOne;
          orderItemOne.put("numberInfos", numberInfosArr);
          orderItemInfosArr.put(orderItemOne);
        } else {
          Log.log().error("SubmitPro.buildDataOmMax3DPlusTotal: Bo so khong hop le, co dau hieu hack");
        } 
      } 
    } catch (Exception e) {
      Log.log().error("SubmitPro.buildDataOmMax3DPlusTotal: " + e.getMessage());
    } 
    return countAllMoneyTotal;
  }
}
