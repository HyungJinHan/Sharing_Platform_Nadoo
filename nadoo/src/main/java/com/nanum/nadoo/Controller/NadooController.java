package com.nanum.nadoo.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nanum.nadoo.Entity.KakaoVO;
import com.nanum.nadoo.Entity.User;
import com.nanum.nadoo.Service.LoginService;
import com.nanum.nadoo.Service.NadooService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins="*")
@RestController
@Log4j2
public class NadooController {

  @Autowired
  NadooService service;

  @Autowired
  LoginService loginService;

  @RequestMapping("/nadoo")
  public String getAllUsers() {
    return "Nadoo";
  }

  // 최신 나두 (등록일 최신순 거래 리스트 반환)
  @RequestMapping("/nadoo/recentTrades")
  public String recentTrades(){
    Map<String, Object> result = service.getRecentTrades();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(result);
  }

  // 종료 임박 (종료일 내림차순 거래 리스트 반환)
  @RequestMapping("/nadoo/closerTrades")
  public String closerTrades(){
    Map<String, Object> result = service.getCloserTrades();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(result);
  }

  // 모든 거래 리스트(최신순)
  @RequestMapping("/nadoo/tradeAll")
  public String getAllTrades(){
    Map<String, Object> result = service.getAllTrades();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(result);
  }

  @RequestMapping("/nadoo/loginCheck")
  public String loginCheck(@RequestBody Map<String, String> loginMap){

    Map<String, Object> result = service.loginCheck(loginMap.get("userAccount"));
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(result);
  }

  // 카카오 로그인
  // 프론트에서 인가코드를 받아옴, 받은 인가코드로 카카오서버에서 액세스 토큰 받아와서 반환
  @RequestMapping("/oauth/login")
  public String login(@RequestParam(value = "code", required = false) String code) throws Exception {
//    System.out.println("#######" + code);
    String access_token = loginService.getAccessToken(code);
//    System.out.println("###access_token###" + access_token);
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return access_token;
  }

  // 받은 액세스 토큰으로 유저 정보 확인, 로그인/회원가입 처리
  @RequestMapping("/oauth/userInfo")
  public String userInfo(@RequestParam(value = "token") String token) throws Exception {
    User userInfo = loginService.getUserInfo(token);
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    Map<String, Object> map = new HashMap<String, Object>();

    map.put("userInfo", userInfo);
    return gson.toJson(map);
  }

}
