package com.elcom.model.action;

import com.elcom.config.web.Log;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public class UserPro {
  public boolean checkLogin(HttpServletRequest request) {
    boolean flag = false;
    try {
      if (request.getSession().getAttribute("msisdn") != null)
        flag = true; 
    } catch (Exception e) {
      Log.log().error("UserPro.checkLogin ==> error : ", e);
    } 
    return flag;
  }
  
  public void logout(HttpServletRequest request) {
    try {
      if (request != null)
        request.getSession().invalidate(); 
    } catch (Exception e) {
      Log.log().error("UserPro.logout ==> error : ", e);
    } 
  }
}
