package com.nanum.nadoo.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nanum.nadoo.Entity.KakaoVO;
import com.nanum.nadoo.Service.LoginService;
import com.nanum.nadoo.Service.NadooService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
  @Autowired
  LoginService service;

  // 2023-01-03 카카오 로그인
  @GetMapping("/callback")
  public String getKakaoAccount(@RequestParam("code") String code) {
    System.out.println("code = " + code);
    String access_token = service.getAccessToken(code);
    KakaoVO userInfo = service.getUserInfo(access_token);

    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(userInfo);
  }

  // 테스트 진행중
  // @RequestMapping("/test")
  // public String loginTest(){
  //
  // return "kakaoLogin";
  // }

  @RequestMapping("/oauth/login")
  public String login(@RequestParam(value = "code", required = false) String code) throws Exception {
    System.out.println("#######" + code);

    String access_token = service.getAccessToken(code);
    System.out.println("###access_token###" + access_token);

    // KakaoVO userInfo = service.getUserInfo(access_token);
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    // return gson.toJson(userInfo);
    return access_token;
  }

  @RequestMapping("/oauth/userInfo")
  public String userInfo(@RequestParam(value = "token") String token) throws Exception {
    KakaoVO userInfo = service.getUserInfo(token);
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    return gson.toJson(userInfo);
  }
}
