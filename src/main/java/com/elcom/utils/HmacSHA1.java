package com.elcom.utils;

import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.InvalidKeyException;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.log4j.Logger;

public class HmacSHA1 {
  private static final Logger logger = Logger.getLogger(com.elcom.utils.HmacSHA1.class);
  
  private Mac mac = null;
  
  public static com.elcom.utils.HmacSHA1 getInstance(String secret) {
    return new com.elcom.utils.HmacSHA1(secret);
  }
  
  private HmacSHA1(String secret) {
    SecretKeySpec signingKey = new SecretKeySpec(secret.getBytes(), "HmacSHA1");
    try {
      this.mac = Mac.getInstance("HmacSHA1");
      this.mac.init(signingKey);
    } catch (InvalidKeyException|java.security.NoSuchAlgorithmException e) {
      logger.error("ConstructHmacSHA1", e);
    } 
  }
  
  public String signWithUrlSafe(String data) {
    try {
      byte[] digest = this.mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
      return Base64.getUrlEncoder().encodeToString(digest);
    } catch (IllegalStateException e) {
      logger.error("SignHmacSHA1", e);
      return null;
    } 
  }
}
