package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Entity.KakaoVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KakaoVORepository extends JpaRepository<KakaoVO, String> {
    KakaoVO findByUserAccount(String userAccount);
}