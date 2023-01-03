package com.nanum.nadoo.Entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class KakaoVO {
    @Id
    @Column(name = "user_account", length = 100)
    private String userAccount;  //유저계정

    @Column(name = "user_nick", nullable = false, length = 300)
    private String userNick; //닉네임

}
