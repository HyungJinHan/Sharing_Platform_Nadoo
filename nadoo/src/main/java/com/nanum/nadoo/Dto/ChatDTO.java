package com.nanum.nadoo.Dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class ChatDTO {
    private Long chatIdx;          // 채팅 인덱스
    private String chatContent;      // 채팅 내용
    private Long tradeIdx;    // 거래 인덱스


}
