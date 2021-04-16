package com.elcom.config.app;

import com.elcom.config.app.RequestInterceptor;
import java.util.Locale;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.elcom.*"})
public class AppConfig extends WebMvcConfigurerAdapter {
  @Bean
  public TilesConfigurer tilesConfigurer() {
    TilesConfigurer tilesConfigurer = new TilesConfigurer();
    tilesConfigurer.setDefinitions(new String[] { "/WEB-INF/views/tiles/tiles.xml" });
    tilesConfigurer.setCheckRefresh(true);
    return tilesConfigurer;
  }
  
  public void configureViewResolvers(ViewResolverRegistry registry) {
    TilesViewResolver viewResolver = new TilesViewResolver();
    registry.viewResolver((ViewResolver)viewResolver);
  }
  
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler(new String[] { "/static/**" }).addResourceLocations(new String[] { "/static/" });
    registry.addResourceHandler(new String[] { "/resources/**" }).addResourceLocations(new String[] { "/resources/" });
    registry.addResourceHandler(new String[] { "/css/**" }).addResourceLocations(new String[] { "/css/" });
    registry.addResourceHandler(new String[] { "/js/**" }).addResourceLocations(new String[] { "/js/" });
  }
  
  public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
  }
  
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor((HandlerInterceptor)new RequestInterceptor());
    LocaleChangeInterceptor localeInterceptor = new LocaleChangeInterceptor();
    localeInterceptor.setParamName("lang");
    registry.addInterceptor((HandlerInterceptor)localeInterceptor).addPathPatterns(new String[] { "/**" });
  }
  
  @Bean
  public ResourceBundleMessageSource messageSource() {
    ResourceBundleMessageSource rb = new ResourceBundleMessageSource();
    rb.setBasenames(new String[] { "app-label/app-label" });
    rb.setDefaultEncoding("UTF-8");
    return rb;
  }
  
  @Bean
  public LocaleResolver localeResolver() {
    SessionLocaleResolver resolver = new SessionLocaleResolver();
    resolver.setDefaultLocale(new Locale("vi"));
    return (LocaleResolver)resolver;
  }
}
