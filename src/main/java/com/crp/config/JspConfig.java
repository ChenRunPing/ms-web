package com.crp.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * ms-web - com.crp.config
 *
 * @author superChen
 * @create 2017-04-07 14:45
 */
@Configuration
@ComponentScan("com.crp")
public class JspConfig extends WebMvcConfigurerAdapter {

    /**
     * Add resource handlers.
     *
     * @param registry the registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/js/**").addResourceLocations("/resources/js/");
        registry.addResourceHandler("/resources/css/**").addResourceLocations("/resources/css/");
        registry.addResourceHandler("/resources/img/**").addResourceLocations("/resources/img/");
        super.addResourceHandlers(registry);
    }
}
