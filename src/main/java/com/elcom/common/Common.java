package com.elcom.common;

import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import com.elcom.json.AjaxResponseBody;
import com.elcom.utils.HmacSHA1;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class Common {
  private static char[] SPECIAL_CHARACTERS = new char[] { 
      ' ', '!', '"', '#', '$', '%', '*', '+', ',', ':', 
      '<', '=', '>', '?', '@', '[', '\\', ']', '^', '`', 
      '|', '~', 'À', 'Á', 'Â', 'Ã', 'È', 'É', 'Ê', 'Ì', 
      'Í', 'Ò', 'Ó', 'Ô', 'Õ', 'Ù', 'Ú', 'Ý', 'à', 'á', 
      'â', 'ã', 'è', 'é', 'ê', 'ì', 'í', 'ò', 'ó', 'ô', 
      'õ', 'ù', 'ú', 'ý', 'Ă', 'ă', 'Đ', 'đ', 'Ĩ', 'ĩ', 
      'Ũ', 'ũ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ạ', 'ạ', 'Ả', 'ả', 
      'Ấ', 'ấ', 'Ầ', 'ầ', 'Ẩ', 'ẩ', 'Ẫ', 'ẫ', 'Ậ', 'ậ', 
      'Ắ', 'ắ', 'Ằ', 'ằ', 'Ẳ', 'ẳ', 'Ẵ', 'ẵ', 'Ặ', 'ặ', 
      'Ẹ', 'ẹ', 'Ẻ', 'ẻ', 'Ẽ', 'ẽ', 'Ế', 'ế', 'Ề', 'ề', 
      'Ể', 'ể', 'Ễ', 'ễ', 'Ệ', 'ệ', 'Ỉ', 'ỉ', 'Ị', 'ị', 
      'Ọ', 'ọ', 'Ỏ', 'ỏ', 'Ố', 'ố', 'Ồ', 'ồ', 'Ổ', 'ổ', 
      'Ỗ', 'ỗ', 'Ộ', 'ộ', 'Ớ', 'ớ', 'Ờ', 'ờ', 'Ở', 'ở', 
      'Ỡ', 'ỡ', 'Ợ', 'ợ', 'Ụ', 'ụ', 'Ủ', 'ủ', 'Ứ', 'ứ', 
      'Ừ', 'ừ', 'Ử', 'ử', 'Ữ', 'ữ', 'Ự', 'ự' };
  
  private static char[] REPLACEMENTS = new char[] { 
      ' ', Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, '_', Character.MIN_VALUE, '_', 
      Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, '_', Character.MIN_VALUE, Character.MIN_VALUE, Character.MIN_VALUE, 
      Character.MIN_VALUE, Character.MIN_VALUE, 'A', 'A', 'A', 'A', 'E', 'E', 'E', 'I', 
      'I', 'O', 'O', 'O', 'O', 'U', 'U', 'Y', 'a', 'a', 
      'a', 'a', 'e', 'e', 'e', 'i', 'i', 'o', 'o', 'o', 
      'o', 'u', 'u', 'y', 'A', 'a', 'D', 'd', 'I', 'i', 
      'U', 'u', 'O', 'o', 'U', 'u', 'A', 'a', 'A', 'a', 
      'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 
      'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 'A', 'a', 
      'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 
      'E', 'e', 'E', 'e', 'E', 'e', 'I', 'i', 'I', 'i', 
      'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 
      'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 'O', 'o', 
      'O', 'o', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 
      'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u' };
  
  private static final String HMAC_SHA1_ALGORITHM = "HmacSHA1";
  
  public static JSONObject commonPostForJsonObjectDuyCD_UpdateUser(String url, JSONObject postInput) {
    JSONObject objOut = null;
    String uri = url;
    RestTemplate restTemplate = new RestTemplate();
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
      headers.add("service-api-key", Config.PHAVD_SERVICE_API_KEY);
      headers.add("service-session-id", Config.PHAVD_SERVICE_SESSION_ID);
      HttpEntity<String> entity = new HttpEntity(postInput.toString(), (MultiValueMap)headers);
      Log.log().info("Common.commonPostForJsonObjectDuyCD_UpdateUser ==> input : " + postInput);
      String strOut = (String)restTemplate.postForObject(uri, entity, String.class, new Object[0]);
      Log.log().info("Common.commonPostForJsonObjectDuyCD_UpdateUser ==> output : " + strOut);
      if (strOut != null)
        objOut = new JSONObject(strOut); 
    } catch (Exception e) {
      Log.log().error("Common.commonPostForJsonObjectDuyCD_UpdateUser ==> error : ", e);
    } 
    return objOut;
  }
  
  public static Map<String, Object> mshhUserUpdate(JSONObject jsonInput) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("object", new Object());
    try {
      String serviceId = Config.PHAVD_SERVICE_API_KEY;
      String cmnd = jsonInput.getString("cmnd");
      String email = jsonInput.getString("email");
      String fullName = jsonInput.getString("fullName");
      String accountId = jsonInput.getString("accountId");
      Long longTime = Long.valueOf((new Date()).getTime());
      String secretKey = Config.SECRET_KEY;
      jsonInput.put("time", longTime + "");
      String checkData = serviceId + accountId + cmnd + email + fullName + longTime;
      String checksum = generateSignatures(checkData, serviceId, secretKey);
      jsonInput.put("checkSum", checksum);
      Log.log().info("Common.mshhUserUpdate ==> input : " + jsonInput);
      JSONObject jsonOutput = mshhUserUpdateUserInfo(jsonInput);
      Log.log().info("Common.mshhUserUpdate ==> output : " + jsonOutput);
      model.put("code", Integer.valueOf(0));
      model.put("object", (new Gson()).fromJson(jsonOutput.toString(), Object.class));
      JSONObject objResult = new JSONObject();
      if (jsonOutput != null && !jsonOutput.isNull("result"))
        objResult = jsonOutput.getJSONObject("result"); 
    } catch (Exception e) {
      Log.log().error("Common.mshhUserUpdate ==> error : ", e);
    } 
    return model;
  }
  
  public static JSONObject mshhUserUpdateUserInfo(JSONObject postInput) {
    JSONObject objOutput = null;
    try {
      String urlConfig = Config.URL_SERVICES_MHSS_USER_UPDATE_ACCOUNT_INFO;
      objOutput = commonPostForJsonObjectDuyCD_UpdateUser(urlConfig, postInput);
    } catch (Exception e) {
      Log.log().error("CommonPro.mshhUserRegister ==> error : ", e);
    } 
    return objOutput;
  }
  
  public static boolean checkSig(String source, String sig, String account) {
    String sigGen = "";
    try {
      sigGen = HmacSHA1.getInstance(Config.TRUEMONEY_SECRET_KEY).signWithUrlSafe(Config.TRUEMONEY_ACCESS_KEY + source + account);
      Log.log().info("sig: " + sig);
      Log.log().info("sigGen: " + sigGen);
    } catch (Exception e) {
      Log.log().error("checkSig error: ", e);
    } 
    return sig.equalsIgnoreCase(sigGen);
  }
  
  public static String generateSignatures(String message, String accessKey, String secretKey) {
    return hmacDigestViettel(accessKey + md5(message), secretKey, "HmacSHA1");
  }
  
  public static String parseString(Object o) {
    if (o == null)
      return ""; 
    String value = String.valueOf(o);
    if ("null".equals(value))
      value = ""; 
    return value;
  }
  
  public static JSONObject commonPostForJsonObjectDuyCD_VerifyUser(String url, JSONObject postInput) {
    JSONObject objOut = null;
    String uri = url;
    RestTemplate restTemplate = new RestTemplate();
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
      headers.add("service-api-key", Config.PHAVD_SERVICE_API_KEY);
      String serviceId = Config.PHAVD_SERVICE_API_KEY;
      String accountId = postInput.getString("accountId");
      String deviceId = postInput.getString("deviceId");
      Long longTime = Long.valueOf((new Date()).getTime());
      String secretKey = Config.SECRET_KEY;
      String checkData = serviceId + accountId + deviceId + longTime;
      String checksum = generateSignatures(checkData, serviceId, secretKey);
      Log.log().info("Common.commonPostForJsonObjectDuyCD_VerifyUser checksum: " + checksum);
      Log.log().info("Common.commonPostForJsonObjectDuyCD_VerifyUser checkdata: " + checkData);
      Log.log().info("Common.commonPostForJsonObjectDuyCD_VerifyUser postInput: " + postInput);
      HttpEntity<String> entity = new HttpEntity(postInput.toString(), (MultiValueMap)headers);
      ResponseEntity<String> strOut = restTemplate.exchange(uri + "?account_id={account_id}&device_id={device_id}&time={time}&check_sum={checksum}", HttpMethod.POST, entity, String.class, new Object[] { accountId, deviceId, longTime, checksum });
      if (strOut != null && strOut.hasBody())
        objOut = new JSONObject((String)strOut.getBody()); 
      Log.log().info("Common.commonPostForJsonObjectDuyCD_VerifyUser postInput: " + objOut);
    } catch (Exception e) {
      Log.log().error("Common.commonPostForJsonObjectDuyCD_VerifyUser ==> error : ", e);
    } 
    return objOut;
  }
  
  public static String hmacDigestViettel(String msg, String keyString, String algo) {
    String digest = "";
    try {
      if (keyString != null && keyString.length() > 0) {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes("UTF-8"), algo);
        Mac mac = Mac.getInstance(algo);
        mac.init(key);
        byte[] bytes = mac.doFinal(msg.getBytes());
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
  
  private static char removeAccent(char ch) {
    int index = Arrays.binarySearch(SPECIAL_CHARACTERS, ch);
    if (index >= 0)
      ch = REPLACEMENTS[index]; 
    return ch;
  }
  
  public static String getMd5Digest(String input) {
    String strMD5 = "";
    try {
      MessageDigest md = MessageDigest.getInstance("MD5");
      byte[] messageDigest = md.digest(input.getBytes());
      BigInteger number = new BigInteger(1, messageDigest);
      strMD5 = number.toString(16);
    } catch (Exception e) {
      System.out.println(e);
      Log.log().error(e);
    } 
    return strMD5;
  }
  
  public static String toUrlFriendly(String s) {
    int maxLength = Math.min(s.length(), 236);
    char[] buffer = new char[maxLength];
    int n = 0;
    for (int i = 0; i < maxLength; i++) {
      char ch = s.charAt(i);
      buffer[n] = removeAccent(ch);
      if (buffer[n] > '\037')
        n++; 
    } 
    while (n > 0 && buffer[n - 1] == '/')
      n--; 
    return String.valueOf(buffer, 0, n);
  }
  
  public static String removeAccentConvert(String s) {
    StringBuilder sb = new StringBuilder(s);
    for (int i = 0; i < sb.length(); i++)
      sb.setCharAt(i, removeAccent(sb.charAt(i))); 
    return sb.toString();
  }
  
  public static String formatMsisdn(String _msisdn, String _pre) {
    if (_msisdn == null || _msisdn.isEmpty())
      return _msisdn; 
    String msisdn = "";
    if (_msisdn.startsWith(_pre))
      return _msisdn; 
    if (_msisdn.startsWith("84")) {
      msisdn = _pre + _msisdn.substring(2);
      return msisdn;
    } 
    if (_msisdn.startsWith("+84")) {
      msisdn = _pre + _msisdn.substring(3);
      return msisdn;
    } 
    if (_msisdn.startsWith("0")) {
      msisdn = _pre + _msisdn.substring(1);
      return msisdn;
    } 
    return _pre + _msisdn;
  }
  
  public static String convertMsisdn(String phonenumber, String prefix) {
    String regex = "^(\\+?84|0)?([3,5,7,8,9]\\d{8}|1[2,6,8,9]\\d{8})$";
    if (phonenumber != null)
      phonenumber = phonenumber.trim(); 
    if (phonenumber.matches(regex))
      return formatMsisdn(phonenumber, prefix); 
    return "";
  }
  
  public static ArrayList<String> csvReader(String pathFile) {
    ArrayList<String> lAll = new ArrayList<>();
    BufferedReader br = null;
    String line = "";
    try {
      br = new BufferedReader(new FileReader(pathFile));
      while ((line = br.readLine()) != null) {
        lAll.add(line);
        System.out.println(line);
      } 
    } catch (Exception e) {
      System.out.println(e);
      Log.log().error(e);
    } finally {
      if (br != null)
        try {
          br.close();
        } catch (Exception e) {
          System.out.println(e);
          Log.log().error(e);
        }  
    } 
    return lAll;
  }
  
  public static String stringToHTMLString(String string) {
    StringBuilder sb = new StringBuilder(string.length());
    boolean lastWasBlankChar = false;
    int len = string.length();
    for (int i = 0; i < len; i++) {
      char c = string.charAt(i);
      if (c == ' ') {
        if (lastWasBlankChar) {
          lastWasBlankChar = false;
          sb.append("&nbsp;");
        } else {
          lastWasBlankChar = true;
          sb.append(' ');
        } 
      } else {
        int ci;
        lastWasBlankChar = false;
        switch (c) {
          case '"':
            sb.append("&quot;");
            break;
          case '&':
            sb.append("&amp;");
            break;
          case '<':
            sb.append("&lt;");
            break;
          case '>':
            sb.append("&gt;");
            break;
          case '\n':
            sb.append("&lt;br/&gt;");
            break;
          default:
            ci = Character.MAX_VALUE & c;
            if (ci < 160) {
              sb.append(c);
              break;
            } 
            sb.append("&#");
            sb.append(Integer.toString(ci));
            sb.append(';');
            break;
        } 
      } 
    } 
    return sb.toString();
  }
  
  public static String convertToDecimalNCRT(String str) {
    String preserve = "ascii";
    String before = "&#";
    String after = ";";
    int haut = 0;
    String CPstring = "";
    for (int i = 0; i < str.length(); i++) {
      int b = str.codePointAt(i);
      if (b < 0 || b > 65535)
        return null; 
      if (haut != 0) {
        if (56320 <= b && b <= 57343) {
          String cp = "65536" + (haut - 55296 << 10) + (b - 56320);
          CPstring = CPstring + before + cp + after;
          haut = 0;
        } else {
          return null;
        } 
      } else if (55296 <= b && b <= 56319) {
        haut = b;
      } else if (preserve.equals("ascii") && b <= 127) {
        CPstring = CPstring + str.charAt(i);
      } else {
        String cp = "" + b;
        CPstring = CPstring + before + cp + after;
      } 
    } 
    return CPstring;
  }
  
  public static String formatDateToStr(Date date, String format) {
    String dateStr = "";
    String deformat = "yyyy-MM-dd HH:mm:ss";
    try {
      if (format != null && !format.isEmpty())
        deformat = format; 
      SimpleDateFormat dt = new SimpleDateFormat(deformat);
      dateStr = dt.format(date);
    } catch (Exception e) {
      Log.log().error("Common.formatDateToStr ==> error : ", e);
    } 
    return dateStr;
  }
  
  public static Date formatStrToDate(String dateStr, String format) {
    Date date = null;
    String deformat = "yyyy-MM-dd HH:mm:ss";
    try {
      if (format != null && !format.isEmpty())
        deformat = format; 
      SimpleDateFormat dt = new SimpleDateFormat(deformat);
      date = dt.parse(dateStr);
    } catch (Exception e) {
      Log.log().error("Common.formatStrToDate ==> error : ", e);
    } 
    return date;
  }
  
  public static String getClientIpAddr(HttpServletRequest request) {
    String ip = request.getHeader("X-Forwarded-For");
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
      ip = request.getHeader("Proxy-Client-IP"); 
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
      ip = request.getHeader("WL-Proxy-Client-IP"); 
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
      ip = request.getHeader("HTTP_CLIENT_IP"); 
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
      ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
      ip = request.getRemoteAddr(); 
    return ip;
  }
  
  public static AjaxResponseBody commonResponseToJson(JSONObject obj) {
    AjaxResponseBody response = new AjaxResponseBody();
    response.setCode(999);
    response.setMsg("common_system_busy");
    if (obj != null) {
      if (obj.has("result"))
        response.setCode(obj.getInt("result")); 
      if (obj.has("resultDesc"))
        response.setMsg(obj.getString("resultDesc")); 
    } 
    return response;
  }
  
  public static void logEventAck(HttpServletRequest request, String cl, String action, String result, String detail) {
    try {
      String text = "ip=" + getClientIpAddr(request) + " | class=" + cl + " | action=" + action + " | result=" + result + " | detail=" + detail;
      Log.log().info(text);
    } catch (Exception e) {
      System.out.println(e);
      Log.log().error("Common.logEventAck ==> error : ", e);
    } 
  }
  
  public static SimpleDateFormat commonSimpleDateFormat() {
    SimpleDateFormat formatter = new SimpleDateFormat("yyyymmddhhmmss");
    return formatter;
  }
  
  public static String commonBuildDataSearch(String uri, JSONObject obj) {
    String url = "";
    try {
      String data = obj.toString();
      data = data.replace("{", "");
      data = data.replace("}", "");
      url = uri + "?key=" + data;
    } catch (Exception e) {
      Log.log().error("Common.commonBuildDataSearch ==> error : ", e);
    } 
    return url;
  }
  
  private static void enableSSL() {
    TrustManager[] trustAllCerts = { (TrustManager)new Object() };
    try {
      SSLContext sc = SSLContext.getInstance("SSL");
      sc.init(null, trustAllCerts, new SecureRandom());
      HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
    } catch (Exception exception) {}
  }
  
  public static String commonBuildUrlParams(HashMap<String, String> dataInput) {
    String url = "?";
    try {
      Set<String> keys = dataInput.keySet();
      int next = 0;
      for (String key : keys) {
        if (next > 0)
          url = url + "&"; 
        url = url + key + "=" + (String)dataInput.get(key);
        next++;
      } 
    } catch (Exception e) {
      Log.log().error("Common.commonBuildUrlParams ==> error : ", e);
    } 
    return url;
  }
  
  public static JSONObject commonGetForJsonObject(String url) {
    JSONObject objOut = null;
    String uri = url;
    RestTemplate restTemplate = new RestTemplate();
    try {
      String strOut = (String)restTemplate.getForObject(uri, String.class, new Object[0]);
      if (strOut != null && !strOut.isEmpty())
        objOut = new JSONObject(strOut); 
    } catch (Exception e) {
      Log.log().error("Common.commonGetForJsonObject ==> error : ", e);
    } 
    return objOut;
  }
  
  public static JSONObject commonGetForJsonObjectPHAVD_Momo(String url) {
    JSONObject objOut = null;
    RestTemplate restTemplate = new RestTemplate();
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
      headers.add("service-api-key", Config.PHAVD_SERVICE_API_KEY);
      headers.add("service-session-id", Config.PHAVD_SERVICE_SESSION_ID);
      HttpEntity<String> entity = new HttpEntity((MultiValueMap)headers);
      ResponseEntity<String> strOut = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, new Object[0]);
      if (strOut != null && strOut.hasBody())
        objOut = new JSONObject((String)strOut.getBody()); 
    } catch (Exception e) {
      Log.log().error("Common.commonGetForJsonObjectPHAVD_Momo ==> error : ", e);
    } 
    return objOut;
  }
  
  public static JSONObject commonPostForJsonObjectPHAVD_Momo(String url, JSONObject postInput) {
    JSONObject objOut = null;
    String uri = url;
    RestTemplate restTemplate = new RestTemplate();
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
      headers.add("service-api-key", Config.PHAVD_SERVICE_API_KEY);
      headers.add("service-session-id", Config.PHAVD_SERVICE_SESSION_ID);
      HttpEntity<String> entity = new HttpEntity(postInput.toString(), (MultiValueMap)headers);
      ResponseEntity<String> strOut = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class, new Object[0]);
      if (strOut != null && strOut.hasBody())
        objOut = new JSONObject((String)strOut.getBody()); 
    } catch (Exception e) {
      Log.log().error("Common.commonPostForJsonObjectPHAVD ==> error : ", e);
    } 
    return objOut;
  }
  
  public static JSONObject commonPostForJsonObjectPHAVD_App(String url, JSONObject postInput) {
    JSONObject objOut = null;
    String uri = url;
    RestTemplate restTemplate = new RestTemplate();
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
      headers.add("service-api-key", Config.PHAVD_SERVICE_APP_SERVICE_ID);
      headers.add("service-session-id", Config.PHAVD_SERVICE_APP_SESSION_ID);
      HttpEntity<String> entity = new HttpEntity(postInput.toString(), (MultiValueMap)headers);
      ResponseEntity<String> strOut = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class, new Object[0]);
      if (strOut != null && strOut.hasBody())
        objOut = new JSONObject((String)strOut.getBody()); 
    } catch (Exception e) {
      Log.log().error("Common.commonPostForJsonObjectPHAVD ==> error : ", e);
    } 
    return objOut;
  }
  
  public static JSONObject commonPutForJsonObjectPHAVD_Momo(String url, JSONObject postInput) {
    JSONObject objOut = null;
    String uri = url;
    RestTemplate restTemplate = new RestTemplate();
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
      headers.add("service-api-key", Config.PHAVD_SERVICE_API_KEY);
      headers.add("service-session-id", Config.PHAVD_SERVICE_SESSION_ID);
      HttpEntity<String> entity = new HttpEntity(postInput.toString(), (MultiValueMap)headers);
      ResponseEntity<String> strOut = restTemplate.exchange(uri, HttpMethod.PUT, entity, String.class, new Object[0]);
      if (strOut != null && strOut.hasBody())
        objOut = new JSONObject((String)strOut.getBody()); 
    } catch (Exception e) {
      Log.log().error("Common.commonPostForJsonObjectPHAVD ==> error : ", e);
    } 
    return objOut;
  }
  
  public static JSONObject commonPostForJsonObjectPHAVD(String url, JSONObject postInput) {
    JSONObject objOut = null;
    String uri = url;
    Log.log().info(postInput);
    RestTemplate restTemplate = new RestTemplate();
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
      HttpEntity<String> entity = new HttpEntity(postInput.toString(), (MultiValueMap)headers);
      String strOut = (String)restTemplate.postForObject(uri, entity, String.class, new Object[0]);
      if (strOut != null && !strOut.isEmpty())
        objOut = new JSONObject(strOut); 
    } catch (Exception e) {
      Log.log().error("Common.commonPostForJsonObjectPHAVD ==> error : ", e);
    } 
    return objOut;
  }
  
  public static JSONObject commonPostForJsonObject_MOMO(String url, MultiValueMap postInput) {
    JSONObject objOut = null;
    RestTemplate restTemplate = new RestTemplate();
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
      HttpEntity<Object> entity = new HttpEntity(postInput, (MultiValueMap)headers);
      String strOut = (String)restTemplate.postForObject(url, entity, String.class, new Object[0]);
      if (strOut != null && !strOut.isEmpty())
        objOut = new JSONObject(strOut); 
    } catch (Exception e) {
      Log.log().error("Common.commonPostForJsonObject_MOMO ==> error : ", e);
    } 
    return objOut;
  }
  
  public static String commonGetMsisdnLogin(HttpServletRequest request) {
    String msisdn = "";
    if (request.getSession().getAttribute("msisdn") != null)
      msisdn = (String)request.getSession().getAttribute("msisdn"); 
    return msisdn;
  }
  
  public static String md5(String message) {
    String digest = null;
    try {
      MessageDigest md = MessageDigest.getInstance("MD5");
      byte[] hash = md.digest(message.getBytes("UTF-8"));
      StringBuilder sb = new StringBuilder(2 * hash.length);
      for (byte b : hash) {
        sb.append(String.format("%02x", new Object[] { Integer.valueOf(b & 0xFF) }));
      } 
      digest = sb.toString();
    } catch (Exception ex) {
      digest = "";
    } 
    return digest;
  }
  
  public static String buildUrlFields(Map fields) {
    List fieldNames = new ArrayList(fields.keySet());
    StringBuilder sb = new StringBuilder();
    Iterator<String> itr = fieldNames.iterator();
    while (itr.hasNext()) {
      String fieldName = itr.next();
      String fieldValue = (String)fields.get(fieldName);
      if (fieldValue != null && fieldValue.length() > 0) {
        sb.append(fieldName);
        sb.append("=");
        sb.append(fieldValue);
      } 
      if (itr.hasNext())
        sb.append("&"); 
    } 
    return sb.toString();
  }
  
  public static String getIpAddress(HttpServletRequest request) {
    String ipAdress;
    try {
      ipAdress = request.getHeader("X-FORWARDED-FOR");
      if (ipAdress == null)
        ipAdress = request.getRemoteAddr(); 
    } catch (Exception e) {
      ipAdress = "Invalid IP:" + e.getMessage();
    } 
    return ipAdress;
  }
  
  public static String getRandomNumber(int len) {
    Random rnd = new Random();
    String chars = "0123456789";
    StringBuilder sb = new StringBuilder(len);
    for (int i = 0; i < len; i++)
      sb.append(chars.charAt(rnd.nextInt(chars.length()))); 
    return sb.toString();
  }
  
  public static String commonPriceWithDecimal(double price) {
    DecimalFormat formatter = new DecimalFormat("###,###,###,###");
    String moneyFr = formatter.format(price);
    return moneyFr.replaceAll(",", ".");
  }
  
  public static String commonFormatMoney(double money) {
    DecimalFormatSymbols symbols = DecimalFormatSymbols.getInstance();
    DecimalFormat formatter = new DecimalFormat("######", symbols);
    return formatter.format(money);
  }
  
  public static boolean isCheckDouble(String input) {
    try {
      Double.parseDouble(input);
      return true;
    } catch (Exception e) {
      Log.log().error("Common.parseDoubleStr ==> error : ", e);
      return false;
    } 
  }
  
  public static double parseDoubleStr(String money) {
    double d_money = 0.0D;
    try {
      d_money = Double.parseDouble(money);
    } catch (Exception e) {
      Log.log().error("Common.parseDoubleStr ==> error : ", e);
    } 
    return d_money;
  }
  
  public static double commonMoneyPower655(int typeBao) {
    double giaveVND = 10000.0D;
    switch (typeBao) {
      case 5:
        giaveVND = 500000.0D;
        break;
      case 7:
        giaveVND = 70000.0D;
        break;
      case 8:
        giaveVND = 280000.0D;
        break;
      case 9:
        giaveVND = 840000.0D;
        break;
      case 10:
        giaveVND = 2100000.0D;
        break;
      case 11:
        giaveVND = 4620000.0D;
        break;
      case 12:
        giaveVND = 9240000.0D;
        break;
      case 13:
        giaveVND = 1.716E7D;
        break;
      case 14:
        giaveVND = 3.003E7D;
        break;
      case 15:
        giaveVND = 5.005E7D;
        break;
      case 18:
        giaveVND = 1.8564E8D;
        break;
    } 
    return giaveVND;
  }
  
  public static double commonMoneyMega645(int typeBao) {
    double giaveVND = 10000.0D;
    switch (typeBao) {
      case 5:
        giaveVND = 400000.0D;
        break;
      case 7:
        giaveVND = 70000.0D;
        break;
      case 8:
        giaveVND = 280000.0D;
        break;
      case 9:
        giaveVND = 840000.0D;
        break;
      case 10:
        giaveVND = 2100000.0D;
        break;
      case 11:
        giaveVND = 4620000.0D;
        break;
      case 12:
        giaveVND = 9240000.0D;
        break;
      case 13:
        giaveVND = 1.716E7D;
        break;
      case 14:
        giaveVND = 3.003E7D;
        break;
      case 15:
        giaveVND = 5.005E7D;
        break;
      case 18:
        giaveVND = 1.8564E8D;
        break;
    } 
    return giaveVND;
  }
  
  public static double commonMoneyMax4D(int typeBao) {
    double giaveVND = 10000.0D;
    return giaveVND;
  }
  
  public static double commonMoneyKeno(int typeBao) {
    double giaveVND = 10000.0D;
    return giaveVND;
  }
}
