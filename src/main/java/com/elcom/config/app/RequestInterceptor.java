package com.elcom.config.app;

import com.elcom.common.Common;
import com.elcom.config.web.Log;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class RequestInterceptor extends HandlerInterceptorAdapter {
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    boolean flag = false;
    System.out.println("Request URL-NAME: " + request.getServletPath());
    System.out.println("Client IP: " + Common.getClientIpAddr(request));
    List<String> pageDefault = new ArrayList<>();
    pageDefault.add("/history/logout");
    pageDefault.add("/error-403");
    pageDefault.add("/error-404");
    pageDefault.add("/error-500");
    pageDefault.add("/error-mid");
    pageDefault.add("");
    pageDefault.add("/home");
    pageDefault.add("/bulk");
    pageDefault.add("/power655");
    pageDefault.add("/mega645");
    pageDefault.add("/max4d");
    pageDefault.add("/max3d");
    pageDefault.add("/ommax3dplus");
    pageDefault.add("/max3dplus");
    pageDefault.add("/basket");
    pageDefault.add("/receive");
    pageDefault.add("/history/login");
    pageDefault.add("/action/return/success");
    pageDefault.add("/action/return/info");
    pageDefault.add("/keno");
    pageDefault.add("/history_keno");
    try {
      String url_name = request.getServletPath();
      if (url_name != null && url_name.endsWith("/"))
        url_name = url_name.substring(0, url_name.length() - 1); 
      if (url_name.equalsIgnoreCase(""))
        try {
          String source = request.getParameter("source");
          String sig = request.getParameter("sig").replaceAll(" ", "+");
          String account = request.getParameter("account");
          if (account != null && sig != null) {
            if (Common.checkSig(source, sig, account)) {
              request.getSession().setAttribute("msisdn", Common.formatMsisdn(account, "84"));
            } else {
              Log.log().error("loi khi check sig");
              Log.log().error("source: " + source);
              Log.log().error("sig: " + sig);
              Log.log().error("account: " + account);
              return false;
            } 
          } else {
            String sdt = Common.parseString(Common.commonGetMsisdnLogin(request));
            if (sdt.length() == 0) {
              response.sendRedirect(request.getContextPath() + "/error-mid");
              Log.log().info("Khong lay duoc sđt => khong cho phep truy cap");
              return flag;
            } 
          } 
        } catch (Exception e) {
          Log.log().info("Cannot get MID", e);
          response.sendRedirect(request.getContextPath() + "/error-mid");
          Log.log().info("loi khi lay sđt => khong cho phep truy cap");
          return false;
        }  
      if (request.getMethod().equalsIgnoreCase("GET")) {
        boolean checkDefault = false;
        for (String str : pageDefault) {
          if (str.equalsIgnoreCase(url_name)) {
            checkDefault = true;
            break;
          } 
        } 
        if (request.getSession().getAttribute("TOKEN") == null)
          request.getSession().setAttribute("TOKEN", UUID.randomUUID().toString()); 
        if (checkDefault) {
          flag = true;
        } else if (request.getSession().getAttribute("msisdn") != null) {
          flag = true;
        } else {
          request.getSession().setAttribute("URL_BACK", url_name);
          response.sendRedirect(request.getContextPath() + "/history/login");
        } 
      } else if (request.getMethod().equalsIgnoreCase("POST")) {
        String token_client = request.getHeader("TOKEN");
        String token_server = (String)request.getSession().getAttribute("TOKEN");
        if (token_server.equalsIgnoreCase(token_client)) {
          flag = true;
        } else {
          response.setStatus(401);
          Log.log().error("RequestInterceptor.preHandle ==> tool : truy cap khong hop le.");
        } 
      } 
    } catch (Exception e) {
      Log.log().error("RequestInterceptor.preHandle ==> error : ", e);
    } 
    return flag;
  }
  
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {}
  
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {}
}
