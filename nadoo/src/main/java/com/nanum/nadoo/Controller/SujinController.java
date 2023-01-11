package com.nanum.nadoo.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nanum.nadoo.Dto.ChatDTO;
import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Service.NadooService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@CrossOrigin(origins = "*")
public class SujinController {

  @Autowired
  NadooService service;

  // @RequestMapping(value = "/nadoo/detail/{tradeIdx}", method =
  // RequestMethod.GET)
  // public String getDetail(@PathVariable Long tradeIdx) {
  // TradeDetailDTO trade = service.getDetail(tradeIdx);
  // Gson gson = new GsonBuilder().setPrettyPrinting().create();
  //
  // return gson.toJson(trade);
  // }

  // 윤기
  // @RequestMapping(value = "/nadoo/detail", method = RequestMethod.POST)
  @RequestMapping(value = "/nadoo/detail")
  public String getDetail2(@RequestBody Map<String, Long> paramMap) {
    TradeDetailDTO trade = service.getDetail(paramMap.get("tradeIdx"));
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(trade);
  }

//  @RequestMapping(value = "/nadoo/chat")
//  public String getChat(@RequestBody Map<String, Long> paramMap) {
//    List<ChatDTO> chat = service.getChat(paramMap.get("tradeIdx"));
//    Gson gson = new GsonBuilder().setPrettyPrinting().create();
//
//    return gson.toJson(chat);
//  }

}
