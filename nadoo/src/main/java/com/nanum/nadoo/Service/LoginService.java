package com.nanum.nadoo.Service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nanum.nadoo.Entity.KakaoVO;
import com.nanum.nadoo.Repository.KakaoVORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.*;
import java.util.HashMap;
import java.util.Map;


@Service
public class LoginService {

    @Autowired
    KakaoVORepository kRepository;

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
            sb.append("&redirect_uri=http://localhost:8088/oauth/login"); // TODO 인가코드 받은 redirect_uri 입력
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
    public KakaoVO getUserInfo(String access_Token){
        KakaoVO userInfo = new KakaoVO();
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
            System.out.println("responseCode 확인 : " + responseCode);
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            // 버퍼를 사용하여 읽은 것
            String line = "";
            String result = "";
            while((line = br.readLine()) != null){
                result += line;
            }

            System.out.println("respone body 확인 : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();

            //userInfo.put("nickname", nickname);
            //userInfo.put("email", email);

            userInfo.setUserAccount(email);
            userInfo.setUserNick(nickname);

            KakaoVO findUser = kRepository.findByUserAccount(userInfo.getUserAccount());
            System.out.println("##DB 유저 : " + findUser);
            if(findUser == null){
                kRepository.save(userInfo);
            }

        } catch(Exception e){
            e.printStackTrace();
        }

        return userInfo;
    }
}
