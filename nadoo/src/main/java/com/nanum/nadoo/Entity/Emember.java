package com.nanum.nadoo.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Emember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emember_idx")
    private Long ememberIdx;    // 종료 거래 참여인원 순번

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_idx")
    private Trade TradeVO;      // 거래 순번

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_account")
    private User userVO;      // 유저 계정
}
