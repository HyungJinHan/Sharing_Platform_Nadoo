package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAll();

    // like %카테고리 이름% 으로 찾기
    Category findByCategoryNameContaining(String name);

    // 카테고리 이름으로 카테고리 찾기
    @Query("select c from Category c where c.categoryName = :name")
    Category findByCategoryName(@Param(value="name") String name);
}