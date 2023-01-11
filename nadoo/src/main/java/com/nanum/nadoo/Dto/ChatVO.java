package com.nanum.nadoo.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class ChatVO {

    private String message;      // 채팅 내용

    private String date;    // 채팅시간


}
