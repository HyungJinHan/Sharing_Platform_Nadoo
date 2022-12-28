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
public class EndTrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "end_idx")
    private Long endIdx;    // 종료 거래 순번

    @Column(name = "end_endtype", nullable = false, length = 30)
    private String endEndtype;  // 종료 타입

    @Column(name = "end_address", nullable = false, length = 60)
    private String endAddress;  // 거래 주소

    @Column(name = "end_type", nullable = false, length = 30)
    private String endType;     // 거래 타입

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_starttime", nullable = false)
    private Date endStarttime;  // 종료 거래 시작시간

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_endtime", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date endEndtime;    // 종료 거래 종료시간

    @Column(name = "end_max", nullable = false)
    private int endMax;         // 거래 가능 인원수
    
    @Column(name = "end_title", nullable = false)
    private String endTitle;         // 종료 거래 제목

    // end_content 추가해야함

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "end_category")
    private Category endCategoryVO;   // 물품 종류

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "endadoo_master")
    private User endMasterVO;   // 거래 주최 유저
}
