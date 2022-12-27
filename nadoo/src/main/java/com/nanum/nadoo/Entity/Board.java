package com.nanum.nadoo.Entity;

import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table
@Data
public class Board {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "board_idx", nullable = false, length = 500)
    private Long boardIdx;  //게시판 번호

    @Column(name = "board_content", nullable = false, length = 1000)
    private String boardContent; //게시판 내용

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false)
    private Date boardTime; //작성일자

    @Column(name = "board_addr", nullable = false, length = 300)
    private String boardAddr; //게시판 주소

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_accont")
//    private Users users; //작성자

}
