package com.nanum.nadoo.Entity;

import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Users {
    @Id
    @Column(name = "user_id", length = 200)
    private String userId;

    @Column(name = "user_name", nullable = false, length = 500)
    private String userName;

    @Column(name = "user_address", nullable = false, length = 1000)
    private String userAddress;

    @Column(name = "user_hp", nullable = false, length = 100)
    private String userHp;
    // @Temporal(TemporalType.TIMESTAMP) // 날짜 타입일 때 사용
    // @UpdateTimestamp
    // @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", name =
    // "board_date", nullable = false)
    // private Date boardDate;
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "user_id")
    // private Users usersVO;
}
