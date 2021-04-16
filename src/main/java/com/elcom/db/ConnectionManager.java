package com.elcom.db;

import com.elcom.config.web.Config;
import com.elcom.config.web.Log;
import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionManager {
  public static Connection getConnection() {
    try {
      String driver = Config.DRIVER;
      String url = Config.URL;
      String user = Config.USER;
      String pass = Config.PASS;
      Class.forName(driver);
      Connection con = DriverManager.getConnection(url, user, pass);
      if (con != null && !con.isClosed())
        con.setAutoCommit(false); 
      return con;
    } catch (Exception e) {
      System.err.println("not connection ==>" + e.getMessage());
      System.err.println("not connection ==>" + e);
      Log.log().error("not connection ==> ", e);
      return null;
    } 
  }
}
