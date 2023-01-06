package com.nanum.nadoo.Dto;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TradeDetailDTO {
    private Long tradeIdx; // 거래 인덱스
    private String tradeAddress; // 거래 주소
    private String tradeTitle; // 거래 제목
    private String tradeContent; // 거래 내용
    private String userNick; // 거래 주최 유저
    private String tradeProduct; // 거래 상품이름
    private int tradePrice; // 거래 가격
    private Date tradeStarttime; // 거래 등록 시간
    private Date tradeEndtime; // 거래 종료 시간
    private int tradeMax; // 최대 인원
    private String tradeType; // 거래 타입
    private long tradeViews; // 조회수
    private int tradeCheck; // 거래 유지 여부 (tradeMax 기준)
    private String userAccount;
    private long diffTime; // 종료 남은 시간
}
