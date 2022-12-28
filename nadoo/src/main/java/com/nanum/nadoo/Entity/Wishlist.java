package com.nanum.nadoo.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_idx")
    private Long wishlistIdx;    // 찜 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_account")
    private User userVO;      // 찜한 유저

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_idx")
    private Trade tradeVO;      // 찜 된 거래 순번
}
