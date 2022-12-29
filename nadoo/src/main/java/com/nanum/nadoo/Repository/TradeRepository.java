package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findAll();

    // 등록일순 거래내용
    List<Trade> findAllOrderByTradeStarttimeDesc();
}