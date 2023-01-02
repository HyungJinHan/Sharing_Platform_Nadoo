package com.nanum.nadoo.Entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@DynamicInsert
@DynamicUpdate
public class Trade {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "trade_idx")
    private Long tradeIdx;  //거래모임순번

    @Column(name = "trade_address", nullable = false, length = 300)
    private String tradeAddress; //거래주소

    @Column(name = "trade_type", nullable = false, length = 30)
    private String tradeType; //거래타입

    @Column(name = "trade_starttime", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date tradeStarttime; //거래 시작 시간

    @Column(name = "trade_endtime", nullable = false)
    private Date tradeEndtime; //거래 종료 시간

    @Column(name = "trade_max", nullable = false)
    private int tradeMax; //거래 가능 인원수

    @Column(name = "trade_title", nullable = false, length = 300)
    private String tradeTitle; //거래제목

    @Lob
    @Column(name = "trade_content", nullable = false, length = 3000)
    private String tradeContent;    // 거래 내용


    @Column(name = "trade_views", columnDefinition = "INT_UNSIGNED default 0")
    private Long tradeViews; //거래조회수

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_idx")
    private Category tradeCategoryVO;   // 물품 종류

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_account")
    private User tradeMasterVO;   // 거래 주최 유저

    @Column(name = "trade_product", columnDefinition = "varchar(30) default '일반거래'")
    private String tradeProduct; // 물품 종류

    @Column(name = "trade_price")
    private int tradePrice; // 물품 가격

    @Column(name = "trade_check", columnDefinition = "int(1) default 1")
    private int tradeCheck; // 거래 유지 여부 (tradeMax 기준 거래가능=1 거래불가=0)

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "writer")
//    private Users users; //작성자
//    @OneToMany(mappedBy="board", fetch=FetchType.LAZY)
//    private List<Comment> comment;
}
