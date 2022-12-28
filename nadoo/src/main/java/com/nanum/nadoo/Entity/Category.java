package com.nanum.nadoo.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_idx")
    private Long categoryIdx;    // 카테고리 번호

    @Column(name = "category_name", nullable = false, length = 30)
    private String categoryName;
}
