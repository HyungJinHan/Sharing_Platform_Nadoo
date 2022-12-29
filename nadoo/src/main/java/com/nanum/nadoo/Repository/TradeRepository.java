package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findAll();

    // 거래내용 등록일순 내림차순
    List<Trade> findAllByOrderByTradeStarttimeDesc();

    // 거래내용 종료일순 오름차순
    List<Trade> findAllByOrderByTradeEndtimeAsc();
}