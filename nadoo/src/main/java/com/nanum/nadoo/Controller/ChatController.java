package com.nanum.nadoo.Controller;

import com.nanum.nadoo.Dto.Message;

import com.nanum.nadoo.Service.ChatService;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@Log4j2
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    ChatService chatService;

    @MessageMapping("/message/{idxState}")
    @SendTo("/chatroom/public/{idxState}")
    public Message receiveMessage(@Payload Message message) {
        log.info(message);
        chatService.setmessage(message);
        // log.info(idxState);
        // simpMessagingTemplate.convertAndSend("/chatroom/public" + idxState, message);
        return message;
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message) {

        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        System.out.println(message.toString());
        return message;
    }
}
