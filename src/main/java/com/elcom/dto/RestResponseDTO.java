package com.elcom.dto;

public class RestResponseDTO {
  private int requestId;
  
  private int result;
  
  private String resultDesc;
  
  public int getRequestId() {
    return this.requestId;
  }
  
  public void setRequestId(int requestId) {
    this.requestId = requestId;
  }
  
  public int getResult() {
    return this.result;
  }
  
  public void setResult(int result) {
    this.result = result;
  }
  
  public String getResultDesc() {
    return this.resultDesc;
  }
  
  public void setResultDesc(String resultDesc) {
    this.resultDesc = resultDesc;
  }
}
