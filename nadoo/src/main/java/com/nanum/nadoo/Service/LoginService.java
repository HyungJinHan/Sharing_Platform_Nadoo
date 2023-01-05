package com.nanum.nadoo.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nanum.nadoo.Entity.KakaoVO;
import com.nanum.nadoo.Entity.User;
import com.nanum.nadoo.Repository.KakaoVORepository;
import com.nanum.nadoo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.yaml.snakeyaml.util.UriEncoder;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.*;
import java.util.HashMap;
import java.util.Map;


@Service
public class LoginService {

    @Autowired
    UserRepository userRepository;

    /*  (카카오 로그인)  */
    // 뱓은 인가코드로 액세스 토큰 받아오기
    public String getAccessToken(String authorize_code){
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=4b6aab937e2879273728054a3b7ec4a4"); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=http://localhost:3000/oauth/login"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + authorize_code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode 확인 : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e){
            e.printStackTrace();
        }

        return access_Token;
    }

    // access_token 값 읽어오고 DB 저장
    public User getUserInfo(String access_Token){
        User userInfo = new User();
        //Map<String, Object> userInfo = new HashMap<>();

        String reqURL = "https://kapi.kakao.com/v2/user/me";

        try{
            URL url = new URL(reqURL);  // 1. url객체 만들기
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // 2. url에서 url connection 만들기
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);

            // 키값, 속성 적용
            int responseCode = conn.getResponseCode();  // 서버에서 보낸 http 상태 코드 반환
//            System.out.println("responseCode 확인 : " + responseCode);
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            // 버퍼를 사용하여 읽은 것
            String line = "";
            String result = "";
            while((line = br.readLine()) != null){
                result += line;
            }
//            System.out.println("respone body 확인 : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();

            userInfo.setUserAccount(email);
            userInfo.setUserNick(nickname);

            // 회원가입 안되있으면 회원가입 처리
            User findUser = userRepository.findByUserAccount(userInfo.getUserAccount());
            if(findUser == null){
                userRepository.save(userInfo);
            }

        } catch(Exception e){
            e.printStackTrace();
        }

        return userInfo;
    }


    /*  (네이버 로그인)  */
    // 넘어온 인가코드로 AccessToken 받아와서 유저정보 확인
    public String getNaverAccessToken(String code, String state) throws IOException {

        String apiURL;
        apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&";
        apiURL += "client_id=" + "kFXWxG9S3JYGuLNlgz3l";
        apiURL += "&client_secret=" + "ckWI_3YivU";
        apiURL += "&redirect_uri=" + "http://localhost:3000/login/naver";
        apiURL += "&code=" + code;
        apiURL += "&state=" + state;

        // 반환 토큰 = {"access_token": ~, "refresh_token": ~, "token_type": ~, "expires_in": ~}
        String token = requestToServer(apiURL);

        // 액세스 토큰만 가져오기
        JsonParser parser = new JsonParser();
        JsonObject parsedToken = (JsonObject) parser.parse(token);

        String accessToken = parsedToken.get("access_token").getAsString();
        System.out.println("#####액세스 토큰 : " + accessToken);

        return accessToken;
    }

    // 토큰으로 사용자 정보 가져오기
    public User getNaverUserInfo(String accessToken) throws IOException{
        String apiURL = "https://openapi.naver.com/v1/nid/me";
        String headerStr = "Bearer " + accessToken;
        String result = requestToServer(apiURL, headerStr);

        // 유저 정보 반환값은 response에 담겨있음, json객체로 변환
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(result);
        JsonObject response = element.getAsJsonObject().get("response").getAsJsonObject();

        // 이메일, 닉네임, 핸드폰번호 가져오기
        String email = response.getAsJsonObject().get("email").getAsString();
        String nickname = response.getAsJsonObject().get("nickname").getAsString();
        String mobile = response.getAsJsonObject().get("mobile").getAsString();

        // 유저객체에 저장
        User userInfo = new User();
        userInfo.setUserAccount(email);
        userInfo.setUserNick(nickname);
        userInfo.setUserHp(mobile);

        // 회원가입 안되있으면 회원가입 처리
        User findUser = userRepository.findByUserAccount(userInfo.getUserAccount());
        if(findUser == null){
            userRepository.save(userInfo);
        }

        return userInfo;
    }

    // 네이버 서버와 통신, Request 값 받아오는 함수
    private String requestToServer(String apiURL, String headerStr) throws IOException {
        URL url = new URL(apiURL);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setRequestMethod("GET");
        System.out.println("header Str: " + headerStr);
        if(headerStr != null && !headerStr.equals("") ) {
            con.setRequestProperty("Authorization", headerStr);
        }
        int responseCode = con.getResponseCode();
        BufferedReader br;
        System.out.println("responseCode="+responseCode);
        if(responseCode == 200) { // 정상 호출
            br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        } else {  // 에러 발생
            br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
        }
        String inputLine;
        StringBuffer res = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
            res.append(inputLine);
        }
        br.close();
        if(responseCode==200) {
            return res.toString();
        } else {
            return null;
        }
    }

    // header 없이 통신하기 위한 함수
    private String requestToServer(String apiURL) throws IOException {
        return requestToServer(apiURL, "");
    }
}
