package com.nanum.nadoo.Controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nanum.nadoo.Entity.KakaoVO;
import com.nanum.nadoo.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
  @Autowired
  LoginService loginService;

//  // 카카오 로그인
//  // 프론트에서 인가코드를 받아옴, 받은 인가코드로 카카오서버에서 액세스 토큰 받아와서 반환
//  @RequestMapping("/oauth/login")
//  public String login(@RequestParam(value = "code", required = false) String code) throws Exception {
////    System.out.println("#######" + code);
//    String access_token = service.getAccessToken(code);
////    System.out.println("###access_token###" + access_token);
//    Gson gson = new GsonBuilder().setPrettyPrinting().create();
//
//    return access_token;
//  }
//
//  // 받은 액세스 토큰으로 유저 정보 확인, 로그인/회원가입 처리
//  @RequestMapping("/oauth/userInfo")
//  public String userInfo(@RequestParam(value = "token") String token) throws Exception {
//    KakaoVO userInfo = service.getUserInfo(token);
//    Gson gson = new GsonBuilder().setPrettyPrinting().create();
//    Map<String, Object> map = new HashMap<String, Object>();
//
//    map.put("userInfo", userInfo);
//    return gson.toJson(map);
//  }

  @RequestMapping(value="/login/naver")
  public String loginNaver(@RequestParam(value="code") String code, @RequestParam(value="state") String state){
    loginService.getNaverAccessToken(code, state);
    return "";
  }

//  @RequestMapping("/oauth/naver/userInfo")
//  public String
}
