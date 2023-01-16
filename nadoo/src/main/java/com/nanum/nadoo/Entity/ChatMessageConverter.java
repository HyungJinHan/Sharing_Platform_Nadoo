package com.nanum.nadoo.Entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nanum.nadoo.Dto.ChatVO;
import lombok.extern.log4j.Log4j2;

import javax.persistence.AttributeConverter;
import java.io.IOException;

@Log4j2
public class ChatMessageConverter implements AttributeConverter<ChatVO, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(ChatVO chat) {
        // ChatVO -> Json문자열로 변환
        try {
            return objectMapper.writeValueAsString(chat);
        } catch (JsonProcessingException e) {
            log.error("fail to serialize as object into Json : {}", chat, e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ChatVO convertToEntityAttribute(String jsonStr) {
        // Json 문자열 -> ChatVO로 변환
        try {
            return objectMapper.readValue(jsonStr, ChatVO.class);
        } catch (IOException e) {
            log.error("fail to deserialize as Json into Object : {}", jsonStr, e);
            throw new RuntimeException(e);
        }
    }
}
