package com.elcom.controller;

import com.elcom.common.Common;
import com.elcom.model.action.UserPro;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping({"/"})
public class AppController {
  @Autowired
  UserPro userPro;
  
  @RequestMapping(value = {"", "home"}, method = {RequestMethod.GET})
  public String home(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "home";
  }
  
  @RequestMapping(value = {"bulk"}, method = {RequestMethod.GET})
  public String bulk(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "bulk";
  }
  
  @RequestMapping(value = {"power655"}, method = {RequestMethod.GET})
  public String power655(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "power655";
  }
  
  @RequestMapping(value = {"mega645"}, method = {RequestMethod.GET})
  public String mega645(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "mega645";
  }
  
  @RequestMapping(value = {"max4d"}, method = {RequestMethod.GET})
  public String max4d(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "max4d";
  }
  
  @RequestMapping(value = {"max3d"}, method = {RequestMethod.GET})
  public String max3d(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "max3d";
  }
  
  @RequestMapping(value = {"ommax3dplus"}, method = {RequestMethod.GET})
  public String ommax3dplus(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "ommax3dplus";
  }
  
  @RequestMapping(value = {"max3dplus"}, method = {RequestMethod.GET})
  public String max3dplus(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "max3dplus";
  }
  
  @RequestMapping(value = {"basket"}, method = {RequestMethod.GET})
  public String basket(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "basket";
  }
  
  @RequestMapping(value = {"receive"}, method = {RequestMethod.GET})
  public String receive(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "receive";
  }
  
  @RequestMapping(value = {"keno"}, method = {RequestMethod.GET})
  public String keno(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "keno";
  }
  
  @RequestMapping(value = {"history_keno"}, method = {RequestMethod.GET})
  public String history_keno(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "history_keno";
  }
  
  @RequestMapping(value = {"history"}, method = {RequestMethod.GET})
  public String history(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "history";
  }
  
  @RequestMapping(value = {"history/detail"}, method = {RequestMethod.GET})
  public String historyDetail(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "historyDetail";
  }
  
  @RequestMapping(value = {"history/compare"}, method = {RequestMethod.GET})
  public String historyCompare(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    return "historyCompare";
  }
  
  @RequestMapping(value = {"history/login"}, method = {RequestMethod.GET})
  public String historyLogin(HttpServletRequest request, Model model) {
    model.addAttribute("COMMON_SYSDATE", Long.valueOf((new Date()).getTime()));
    String urlPage = "historyLogin";
    boolean checkLogin = this.userPro.checkLogin(request);
    if (checkLogin)
      urlPage = "redirect:/history"; 
    return urlPage;
  }
  
  @RequestMapping(value = {"history/logout"}, method = {RequestMethod.GET})
  public String historyLogout(HttpServletRequest request) {
    Common.logEventAck(request, "", "LOGOUT", "SUCCESS", "dang xuat thanh cong");
    this.userPro.logout(request);
    return "redirect:/history/login";
  }
  
  @RequestMapping(value = {"change-language"}, method = {RequestMethod.GET})
  public String changeLanguage(ModelMap model, @RequestParam String lang, HttpServletRequest request) {
    if (lang.equals("en")) {
      request.getSession().setAttribute("language", "2");
    } else {
      request.getSession().setAttribute("language", "1");
    } 
    String referrer = request.getHeader("referer");
    return "redirect:" + referrer;
  }
  
  @RequestMapping(value = {"error-403"}, method = {RequestMethod.GET})
  public String error403(HttpServletRequest request) {
    return "403_Page";
  }
  
  @RequestMapping(value = {"error-404"}, method = {RequestMethod.GET})
  public String error404(HttpServletRequest request) {
    return "404_Page";
  }
  
  @RequestMapping(value = {"error-500"}, method = {RequestMethod.GET})
  public String error500(HttpServletRequest request) {
    return "500_Page";
  }
  
  @RequestMapping(value = {"error-mid"}, method = {RequestMethod.GET})
  public String errormid(HttpServletRequest request) {
    return "mid_Page";
  }
}
