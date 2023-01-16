package com.nanum.nadoo.Entity;

import com.google.gson.JsonObject;
import com.nanum.nadoo.Dto.ChatVO;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@DynamicInsert
@DynamicUpdate
public class Chat {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "chat_idx")
    private Long chatIdx;

    @Column(name = "chat_content")
    @Convert(converter = ChatMessageConverter.class)  //json 형식으로 바꿈
    private ChatVO chatVO;
//    @Column(name = "chat_type", nullable = false, length = 100)
//    private String chatType;
    @Column(name="chat_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date chatDate;

//    @Type(type = "json")
//    @Column(name = "content", columnDefinition = "longtext")
//    // MariaDB는 JSON 타입을 사용시 내부적으로 longtext 타입을 가집니다 그래서 columnDefinition을 longtext로 지정 해야 합니다
//    private Map<String, Object> content = new HashMap<>();
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_idx")
    private Trade tradeVO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_nick")
    private User userVO;
}
