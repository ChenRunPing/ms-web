package com.crp.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ms-web - com.crp.controller
 *
 * @author superChen
 * @create 2017-04-06 16:49
 */
@Controller
@Slf4j
public class HomeController {


    @RequestMapping("/")
    public String index(){
        log.info("index");
        return "index";
    }





}
