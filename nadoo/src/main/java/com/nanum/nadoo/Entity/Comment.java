package com.nanum.nadoo.Entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Comment {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "comment_idx")
    private Long commentIdx;  //댓글 번호

    @Column(name = "comment_content", nullable = false, length = 1000)
    private String commentContent; //댓글 내용

    @Column(name="comment_time", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false)
    private Date commentTime; //댓글 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer")
    private User userVO; //댓글 작성자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boardIdx")
    private Board boardVO;



}
