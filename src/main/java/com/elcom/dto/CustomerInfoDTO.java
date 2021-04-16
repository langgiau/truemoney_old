package com.elcom.dto;

public class CustomerInfoDTO {
  private String customerName;
  
  private String phoneNumber;
  
  private String address;
  
  private String lat;
  
  private String lng;
  
  public String getCustomerName() {
    return this.customerName;
  }
  
  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }
  
  public String getPhoneNumber() {
    return this.phoneNumber;
  }
  
  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
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
