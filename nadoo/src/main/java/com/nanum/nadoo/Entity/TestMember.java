package com.nanum.nadoo.Entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

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
public class TestMember {
    @Id
    @Column(name = "mem_id", length = 200)
    private String memId;

    @Column(name = "mem_name", nullable = false, length = 500)
    private String memName;

    @Column(name = "mem_address", nullable = false, length = 1000)
    private String memAddress;
    @ColumnDefault("0")
    @Column(name = "mem_hp", nullable = false, length = 100)
    private String memHp;

    // mariaDB TIMESTAMP 형식으로 사용
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "mem_indate", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date memIndate;

    // mariaDB DATETIME 형식으로 사용
//    @Column(name = "mem_indate")
//    private LocalDateTime memIndate;
//
//    persist되기 전에 java에서 현재 시간을 구한 후 memIndate 변수에 현재시간 적용시키기
//    @PrePersist
//    public void memIndate(){
//        this.memIndate = LocalDateTime.now();
//    }
}
