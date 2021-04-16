package com.elcom.config.web;

import com.elcom.config.web.ConfigLog;
import org.apache.log4j.Logger;

public class Log {
  private static Logger log = null;
  
  public static Logger log() {
    if (log == null)
      log = ConfigLog.ConfigLogger(); 
    return log;
  }
}
