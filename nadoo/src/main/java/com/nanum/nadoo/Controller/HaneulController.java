package com.nanum.nadoo.Controller;

import com.nanum.nadoo.Service.NadooService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Log4j2
@CrossOrigin(origins = "*")
public class HaneulController {

    @Autowired
    NadooService service;

    @RequestMapping("/nadoo/joinTrade")
    public void joinTrade(Map<String, Object> map) {
        // map에 필요한 데이터 tradeIdx, userAccount(참여자꺼 주최자말고)
        service.joinTrade(map);

    }

}
