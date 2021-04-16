package com.elcom.controller.action;

import com.elcom.common.Common;
import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import com.elcom.model.action.CommonPro;
import com.elcom.model.action.UserPro;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
@RequestMapping({"/action/user"})
public class UserController {
  @Autowired
  CommonPro commonPro;
  
  @Autowired
  UserPro userPro;
  
  private static String urlNameRequest = "/action/user";
  
  @RequestMapping(value = {"/login"}, method = {RequestMethod.POST})
  public Map<String, Object> login(HttpServletRequest req) {
    Map<String, Object> model = new HashMap<>();
    model.put("code", Integer.valueOf(999));
    model.put("message", "error");
    try {
      boolean flagLogin = false;
      JSONObject jsonInput = new JSONObject(req.getParameter("json"));
      String option = jsonInput.getString("option");
      String userPhone = jsonInput.getString("userPhone");
      if (option.equals("otp")) {
        String faceCode = jsonInput.getString("faceCode");
        String faceCsrf = jsonInput.getString("faceCsrf");
        if (!faceCsrf.equalsIgnoreCase(Config.FACE_ACC_KIT_APP_CSRF)) {
          model.put("code", Integer.valueOf(22));
          model.put("message", "Mã CSRF không đúng");
          return model;
        } 
        JSONObject jsonOutputFaceAccKit = this.commonPro.checksumFaceAccKit(faceCode);
        if (jsonOutputFaceAccKit == null) {
          model.put("code", Integer.valueOf(33));
          model.put("message", "Xác nhận account kit không đúng");
          return model;
        } 
        String country_prefix = jsonOutputFaceAccKit.getString("country_prefix");
        String national_number = jsonOutputFaceAccKit.getString("national_number");
        String phoneParse = country_prefix + "" + national_number + "";
        if (phoneParse.equals(userPhone)) {
          model.put("code", Integer.valueOf(0));
          model.put("message", "Đăng nhập thành công");
          flagLogin = true;
        } else {
          model.put("code", Integer.valueOf(44));
          model.put("message", "Số điện thoại xác nhận không đúng");
          return model;
        } 
      } else if (option.equals("pw")) {
        String pw = jsonInput.getString("pw");
        JSONObject msisdnPassInput = new JSONObject();
        msisdnPassInput.put("accountId", userPhone + "");
        msisdnPassInput.put("password", Common.md5(pw) + "");
        JSONObject jsonOutputLogin = this.commonPro.mshhUserMsisdnPassConfirm(msisdnPassInput);
        if (jsonOutputLogin == null) {
          model.put("code", Integer.valueOf(33));
          model.put("message", "Vui lòng thử lại sau");
          return model;
        } 
        JSONObject objResultData = new JSONObject();
        if (jsonOutputLogin != null && !jsonOutputLogin.isNull("result"))
          objResultData = jsonOutputLogin.getJSONObject("result"); 
        int code = objResultData.getInt("code");
        if (code == 0) {
          model.put("code", Integer.valueOf(0));
          model.put("message", "Đăng nhập thành công");
          flagLogin = true;
        } else {
          model.put("code", Integer.valueOf(44));
          model.put("message", "Mật khẩu không đúng");
          return model;
        } 
      } 
      if (flagLogin)
        req.getSession().setAttribute("msisdn", userPhone + ""); 
    } catch (Exception e) {
      Log.log().error("UserController.login ==> error : ", e);
    } 
    return model;
  }
}
