package com.nanum.nadoo.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Service.NadooService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
public class NadooController {

  @Autowired
  NadooService service;

  @RequestMapping("/nadoo")
  public String getAllUsers() {
//    List<Users> temp = service.getUsers();
//    Gson gson = new GsonBuilder().setPrettyPrinting().create();
//
//    return gson.toJson(temp);
    return "";
  }

  // 최신 나두 (등록일 최신순 거래 리스트 반환)
  @PostMapping("/nadoo/recentTrades")
  public String rencentTrades(){
    List<Trade> trades = service.getRecentTrades();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(trades);
  }

  // 종료 임박 (종료일 내림차순 거래 리스트 반환)
  @PostMapping("/nadoo/closerTrades")
  public String closerTrades(){
    List<Trade> trades = service.getRecentTrades();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(trades);
  }
}
