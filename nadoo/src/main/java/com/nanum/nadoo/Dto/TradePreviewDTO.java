package com.nanum.nadoo.Dto;

import lombok.*;

import javax.persistence.PrePersist;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class TradePreviewDTO {
    private Long tradeIdx;          // 거래 인덱스
    private String tradeTitle;      // 거래 제목
    private String userNick;        // 거래 주최 유저
    private String tradeProduct;    // 거래 상품이름
    private String tradeAddress;    // 거래 주소
    private int tradePrice;         // 거래 가격
    private Date tradeStarttime;    // 거래 등록 시간
    private Date tradeEndtime;      // 거래 종료 시간
    private long diffTime;          // 종료시간 - 현재시간(초단위)

}
