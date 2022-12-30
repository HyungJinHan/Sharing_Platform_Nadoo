package com.nanum.nadoo.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Service.NadooService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
@CrossOrigin(origins="*")
public class SujinController {

  @Autowired
  NadooService service;

  @RequestMapping("/nadoo/detail/{tradeIdx}")
  public String getDetail(@PathVariable Long tradeIdx) {
    TradeDetailDTO trade = service.getDetail(tradeIdx);
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(trade);
  }
}
