package com.elcom.utils;

import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;

public class ShaFormat {
  private static final char[] HEX_CHARS = "0123456789ABCDEF".toCharArray();
  
  private static final String ENCODING = "UTF-8";
  
  private static final String HMAC_SHA256 = "HmacSHA256";
  
  private static String toHexString(byte[] bytes) {
    StringBuilder sb = new StringBuilder(bytes.length * 2);
    Formatter formatter = new Formatter(sb);
    for (byte b : bytes) {
      formatter.format("%02x", new Object[] { Byte.valueOf(b) });
    } 
    return sb.toString();
  }
  
  public static String signHmacSHA256(String data, String secretKey) throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException {
    SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256");
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(secretKeySpec);
    byte[] rawHmac = mac.doFinal(data.getBytes("UTF-8"));
    return toHexString(rawHmac);
  }
  
  public static String getSHA(String data) throws Exception {
    MessageDigest md = MessageDigest.getInstance("SHA");
    md.update(data.getBytes("UTF8"));
    byte[] ba = md.digest();
    StringBuilder sb = new StringBuilder(ba.length * 2);
    for (int i = 0; i < ba.length; i++) {
      sb.append(HEX_CHARS[(ba[i] & 0xFF) / 16 & 0xF]);
      sb.append(HEX_CHARS[(ba[i] & 0xFF) % 16]);
    } 
    return sb.toString();
  }
  
  public static String decode64(String s) {
    try {
      byte[] valueDecoded = Base64.decodeBase64(s.getBytes());
      return new String(valueDecoded);
    } catch (Exception e) {
      return "";
    } 
  }
  
  public static String encode64(String s) {
    byte[] bytesEncoded = Base64.encodeBase64(s.getBytes());
    return new String(bytesEncoded);
  }
  
  public static String hashSHA256(String input) throws Exception {
    try {
      MessageDigest sha = MessageDigest.getInstance("SHA-256");
      sha.update(input.getBytes());
      BigInteger dis = new BigInteger(1, sha.digest());
      String result = dis.toString(16);
      if (!result.startsWith("0") && result.length() < 64)
        result = "0" + result; 
      return result.toUpperCase();
    } catch (NoSuchAlgorithmException ex) {
      throw new Exception(ex);
    } 
  }
  
  public static String hmacSha1(String value, String key) throws Exception {
    byte[] keyBytes = key.getBytes();
    SecretKeySpec signingKey = new SecretKeySpec(keyBytes, "HmacSHA1");
    Mac mac = Mac.getInstance("HmacSHA1");
    mac.init(signingKey);
    byte[] rawHmac = mac.doFinal(value.getBytes());
    return Base64.encodeBase64URLSafeString(rawHmac);
  }
  
  public static String base64UrlDecode(String input) {
    String result = null;
    Base64 decoder = new Base64(true);
    byte[] decodedBytes = decoder.decode(input);
    result = new String(decodedBytes);
    return result;
  }
  
  public static String checksumUrlDataMomo(Map momoParams) {
    String encodeSignature = "";
    try {
      List fieldNames = new ArrayList(momoParams.keySet());
      StringBuilder hashData = new StringBuilder();
      Iterator<String> itr = fieldNames.iterator();
      while (itr.hasNext()) {
        String fieldName = itr.next();
        String fieldValue = (String)momoParams.get(fieldName);
        if (fieldValue != null && fieldValue.length() > 0) {
          hashData.append(fieldName);
          hashData.append('=');
          hashData.append(fieldValue);
          if (itr.hasNext())
            hashData.append('&'); 
        } 
      } 
      String signature = hashData.toString();
      encodeSignature = signHmacSHA256(signature, Config.MOMO_SECRET_KEY);
    } catch (Exception e) {
      Log.log().error("ShaFormat.checksumUrlDataMomo ==> error : ", e);
    } 
    return encodeSignature;
  }
  
  public static String getUrlBuildMomo(Map momoParams) {
    String paymentUrl = "";
    try {
      List fieldNames = new ArrayList(momoParams.keySet());
      StringBuilder query = new StringBuilder();
      Iterator<String> itr = fieldNames.iterator();
      while (itr.hasNext()) {
        String fieldName = itr.next();
        String fieldValue = (String)momoParams.get(fieldName);
        if (fieldValue != null && fieldValue.length() > 0) {
          query.append(fieldName);
          query.append('=');
          query.append(fieldValue);
          if (itr.hasNext())
            query.append('&'); 
        } 
      } 
      String queryUrl = query.toString();
      Log.log().info("---------------------------- hashDataUrl : ");
      Log.log().info(queryUrl);
      Log.log().info("-------------------------------------------------------------");
      String encodeSignature = signHmacSHA256(queryUrl, Config.MOMO_SECRET_KEY);
      Log.log().info("---------------------------- encodeSignature : ");
      Log.log().info(encodeSignature);
      Log.log().info("-------------------------------------------------------------");
      queryUrl = queryUrl + "&signature=" + encodeSignature;
      paymentUrl = Config.MOMO_API_URL + "?requestType=captureMoMoWallet&" + queryUrl;
      Log.log().info("paymentUrl : " + paymentUrl);
    } catch (Exception e) {
      Log.log().error("ShaFormat.getUrlBuildMomo ==> error : ", e);
    } 
    return paymentUrl;
  }
  
  public static String generateSignatures(String access_key, String amount, String orderId, String orderInfo, String secretkey) {
    String requestParam = "access_key=" + access_key + "&amount=" + amount + "&order_id=" + orderId + "&order_info=" + orderInfo;
    Log.log().info("generateSignatures ==== " + secretkey + " " + requestParam);
    return hmacDigest(requestParam, secretkey, "HmacSHA256");
  }
  
  public static String hmacDigest(String msg, String keyString, String algo) {
    String digest = "";
    try {
      if (keyString != null && keyString.length() > 0) {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes("UTF-8"), algo);
        Mac mac = Mac.getInstance(algo);
        mac.init(key);
        byte[] bytes = mac.doFinal(msg.getBytes("ASCII"));
        StringBuffer hash = new StringBuffer();
        for (int i = 0; i < bytes.length; i++) {
          String hex = Integer.toHexString(0xFF & bytes[i]);
          if (hex.length() == 1)
            hash.append('0'); 
          hash.append(hex);
        } 
        digest = hash.toString();
      } 
    } catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    } catch (InvalidKeyException e) {
      e.printStackTrace();
    } 
    return digest;
  }
  
  public static String encodeSignature(Map momoParams) {
    String signatureCode = "";
    try {
      List fieldNames = new ArrayList(momoParams.keySet());
      StringBuilder query = new StringBuilder();
      Iterator<String> itr = fieldNames.iterator();
      while (itr.hasNext()) {
        String fieldName = itr.next();
        String fieldValue = (String)momoParams.get(fieldName);
        if (fieldValue != null && fieldValue.length() > 0) {
          query.append(fieldName);
          query.append('=');
          query.append(fieldValue);
          if (itr.hasNext())
            query.append('&'); 
        } 
      } 
      String queryUrl = query.toString();
      Log.log().info("---------------------------- hashDataUrl : ");
      Log.log().info(queryUrl);
      Log.log().info("-------------------------------------------------------------");
      signatureCode = signHmacSHA256(queryUrl, Config.MOMO_SECRET_KEY);
      Log.log().info("---------------------------- encodeSignature : ");
      Log.log().info(signatureCode);
      Log.log().info("-------------------------------------------------------------");
    } catch (Exception e) {
      Log.log().error("ShaFormat.encodeSignature ==> error : ", e);
    } 
    return signatureCode;
  }
}
