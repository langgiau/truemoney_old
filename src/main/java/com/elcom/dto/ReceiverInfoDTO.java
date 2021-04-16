package com.elcom.dto;

public class ReceiverInfoDTO {
  private String cmnd;
  
  private String name;
  
  private String phone;
  
  private String address;
  
  private String lat;
  
  private String lng;
  
  public String getCmnd() {
    return this.cmnd;
  }
  
  public void setCmnd(String cmnd) {
    this.cmnd = cmnd;
  }
  
  public String getName() {
    return this.name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public String getPhone() {
    return this.phone;
  }
  
  public void setPhone(String phone) {
    this.phone = phone;
  }
  
  public String getAddress() {
    return this.address;
  }
  
  public void setAddress(String address) {
    this.address = address;
  }
  
  public String getLat() {
    return this.lat;
  }
  
  public void setLat(String lat) {
    this.lat = lat;
  }
  
  public String getLng() {
    return this.lng;
  }
  
  public void setLng(String lng) {
    this.lng = lng;
  }
}
