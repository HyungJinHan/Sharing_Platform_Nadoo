package com.nanum.nadoo.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Tmember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tmember_idx")
    private Long tmemberIdx;    // 거래 참여인원 순번

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_idx")
    private Trade TradeVO;      // 거래 순번

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_account")
    private User userVO;      // 유저 계정
}
