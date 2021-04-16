package com.elcom.json;

import com.elcom.json.Views;
import com.fasterxml.jackson.annotation.JsonView;

public class AjaxResponseBody {
  @JsonView({Views.Public.class})
  private int code;
  
  @JsonView({Views.Public.class})
  private String msg;
  
  public int getCode() {
    return this.code;
  }
  
  public void setCode(int code) {
    this.code = code;
  }
  
  public String getMsg() {
    return this.msg;
  }
  
  public void setMsg(String msg) {
    this.msg = msg;
  }
}
