package com.nanum.nadoo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
public class testController {

  @RequestMapping("/test")
  public void test() {
    log.info("hi");
  }
}
