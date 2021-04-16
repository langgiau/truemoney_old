package com.elcom.config.app;

import com.elcom.config.app.AppConfig;
import com.elcom.config.web.Config;
import com.elcom.config.web.LoadConfig;
import javax.servlet.FilterRegistration;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import org.apache.log4j.xml.DOMConfigurator;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

public class AppInitializer implements WebApplicationInitializer {
  public void onStartup(ServletContext servletContext) throws ServletException {
    AnnotationConfigWebApplicationContext appContext = new AnnotationConfigWebApplicationContext();
    appContext.register(new Class[] { AppConfig.class });
    ServletRegistration.Dynamic dispatcher = servletContext.addServlet("SpringDispatcher", (Servlet)new DispatcherServlet((WebApplicationContext)appContext));
    dispatcher.setLoadOnStartup(1);
    dispatcher.addMapping(new String[] { "/" });
    FilterRegistration.Dynamic fr = servletContext.addFilter("encodingFilter", CharacterEncodingFilter.class);
    fr.setInitParameter("encoding", "UTF-8");
    fr.setInitParameter("forceEncoding", "true");
    fr.addMappingForUrlPatterns(null, true, new String[] { "/*" });
    try {
      LoadConfig lo = new LoadConfig();
      lo.checkConfig();
      lo.loadConfig();
      DOMConfigurator.configureAndWatch(Config.pathFileConfigLog);
      System.out.println("khoi dong web truemoney webpublic thanh cong!");
    } catch (Throwable e) {
      System.out.println(e);
    } 
  }
}
