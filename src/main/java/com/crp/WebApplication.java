package com.crp;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

/**
 * ms-web - com.crp
 *
 * @author superChen
 * @create 2017-04-06 16:15
 */
@SpringBootApplication
@Slf4j
public class WebApplication {



    public static void main(String[] args){
        SpringApplication.run(WebApplication.class,args);
        log.info("web start success!");
    }
}
