package com.nanum.nadoo.Entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@DynamicInsert
public class Board {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "board_idx")
    private Long boardIdx;  //게시판 번호

    @Column(name = "board_content", nullable = false, length = 1000)
    private String boardContent; //게시판 내용

    @Column(name="board_time", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false)
    private Date boardTime; //작성일자

    @Column(name = "board_addr", nullable = false, length = 300)
    private String boardAddr; //게시판 주소

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer")
    private User userVO; //작성자
//    @OneToMany(mappedBy="boardVO", fetch=FetchType.LAZY)
//    private List<Comment> commentVO;

}
