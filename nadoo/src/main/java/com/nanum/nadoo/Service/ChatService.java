package com.nanum.nadoo.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nanum.nadoo.Dto.ChatDTO;
import com.nanum.nadoo.Dto.ChatVO;
import com.nanum.nadoo.Dto.Message;
import com.nanum.nadoo.Entity.Chat;
import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Entity.User;
import com.nanum.nadoo.Repository.ChatRepository;
import com.nanum.nadoo.Repository.TradeRepository;
import com.nanum.nadoo.Repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Log4j2
@Component
@Transactional
public class ChatService {

    @Autowired
    ChatRepository chatRepository;
    @Autowired
    TradeRepository tradeRepository;
    @Autowired
    UserRepository userRepository;
    @PersistenceContext
    EntityManager em;

    public void setmessage(Message message) {
        // Long tradeIdx = message.getRoomId();
        // List<ChatDTO> mesage = chatRepository.findChat(tradeIdx);
        // message.

        /*
         * Long tradeIdx = message.getRoomId();
         * String name = message.getSenderName();
         * String msg = message.getMessage();
         * String date = message.getDate();
         * ChatVO vo = new ChatVO(msg, date);
         * List<Object> list = new ArrayList<Object>();
         * ObjectMapper mapper = new ObjectMapper();
         * try {
         * String jsonString = mapper.writeValueAsString(vo);
         * list.add(jsonString);
         * log.info(jsonString);
         * } catch (JsonProcessingException e) {
         * e.printStackTrace();
         * }
         * Map<String,Object> map = new HashMap<String,Object>();
         * map.put(name,list);
         * log.info(map);
         * String stringMap = map.toString();
         * log.info(stringMap);
         * Chat dto = new Chat();
         * dto.setChatContent(stringMap);
         * Trade trade = new Trade();
         * trade.setTradeIdx(tradeIdx);
         * dto.setTradeVO(trade);
         * chatRepository.save(dto);
         */
        if ((message.getMessage() != null) && (message.getMessage() != "") && (message.getDate() != null)) {
            String name = message.getSenderName();
            String msg = message.getMessage();
            String date = message.getDate();
            Long roomId = message.getRoomId();
            ChatVO vo = new ChatVO(msg, date);
            Chat chat = new Chat();
            chat.setChatVO(vo);
            // Trade trade = new Trade();
            // tradeRepository.findByTradeIdx(roomId);
            // trade.setTradeIdx(roomId);
            chat.setTradeVO(tradeRepository.findByTradeIdx(roomId));
            chat.setUserVO(userRepository.findByUserAccount(name));
            log.info(userRepository.findByUserAccount(name));
            // User user = new User();
            // user.setUserNick(name);
            // chat.setUserVO(user);
            em.persist(chat);
        }

    }
}
