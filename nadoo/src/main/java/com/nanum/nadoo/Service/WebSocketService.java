package com.nanum.nadoo.Service;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nanum.nadoo.Controller.ApplicationContextProvider;
import com.nanum.nadoo.Entity.Chat;
import com.nanum.nadoo.Repository.ChatRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.text.ParseException;
import java.util.*;


@Log4j2
@Service
@ServerEndpoint(value="/socket/chatt")
public class WebSocketService {  //클라이언트가 접속할 때마다 생성되어 클라이언트와 직접 통신하는 클래스
    // 따라서 새로운 클라이언트가 접속할 때마다 클라이언트의 세션 관련 정보를 정적형으로 저장하여 1:N의 통신이 가능하도록 만들어야 함
    private ChatRepository cServ = ApplicationContextProvider.ctx.getBean(ChatRepository.class);

    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
    List<Object> list= new ArrayList<Object>();
    String name;

    @OnOpen  // 클라이언트가 접속할 떄마다 실행
    public void onOpen(Session session) throws Exception {
        log.info("open session : {}, clients={}", session.toString(), clients);

//        대화 내용 list 불러오기

        if(!clients.contains(session)) {   //session이 존재하지 않으면 clients에 접속된 클라이언트를 추가
            clients.add(session);
            log.info("session open : {}", session);

        }else{
            log.info("이미 연결된 session");
        }
    }

    @OnMessage  //메세지 수신시 실행 (clients에 있는 모든 session에게 메세지를 전달)
    public void onMessage(String message, Session session) throws IOException, ParseException {
        log.info("receive message : {}", message);

//         insert 이벤트
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = (JsonObject) parser.parse(message);
        name= jsonObject.get("name").getAsString();
        String jsonString = jsonObject.toString();
        jsonObject.remove("name");
        list.add(jsonObject);
        for (Session s : clients) {
            log.info("send data : {}", message);
//            System.out.println(message.getClass().getSimpleName());
//            System.out.println(message);
            /*JsonParser parser = new JsonParser();
            JsonObject jsonObject = (JsonObject) parser.parse(message);
            String jsonString = jsonObject.toString();
            list.add(jsonObject);*/
//            System.out.println(jsonObject);
//            Chat chat = new Chat();
//                chatRepository.insertMessage(message);
//            chat.setChatContent(jsonString);
//            chat.setChatIdx(100L);
//            String dateStr = "2021-06-19";
//            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//            Date date = formatter.parse(dateStr);
//            chat.setChatDate(date);
//            log.info(chat);
//            log.info(jsonString);
//            cServ.save(chat);

            try {
                s.getBasicRemote().sendText(message);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

    }




    @OnClose  //클라이언트가 접속을 종료할 시(해당 클라이언트 정보를 clients에서 제거)
    public void onClose(Session session) {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put(name,list);
        String message = map.toString();
        Chat chat = new Chat();
//        chat.setChatContent(message);
//        cServ.save(chat);

        log.info("session close : {}", session);
        clients.remove(session);
    }
}