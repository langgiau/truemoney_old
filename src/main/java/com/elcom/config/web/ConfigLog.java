package com.elcom.config.web;

import com.elcom.config.web.Config;
import org.apache.log4j.Logger;

public class ConfigLog {
  public static Logger ConfigLogger() {
    Logger logData = Logger.getLogger(Config.LOG);
    return logData;
  }
}
