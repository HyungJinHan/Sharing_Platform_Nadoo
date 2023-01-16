package com.nanum.nadoo.Entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@DynamicInsert
public class User {
    @Id
    @Column(name = "user_account", nullable = false, length = 30)
    private String userAccount;  //유저계정

    @Column(name = "user_nick", nullable = false, length = 300)
    private String userNick; //닉네임


    @Column(name = "user_hp", length = 30)
    private String userHp; //폰번호

    @Column(name = "recent_addr", length = 300)
    private String recentAddr; //최근 검색 동네

    @Column(name = "favorite_addr", length = 300)
    private String favoriteAddr; //즐겨찾기 동네

    @Column(name = "user_rate", columnDefinition = "decimal(2,1) default 0")
    private Float userRate; //즐겨찾기 동네
}
