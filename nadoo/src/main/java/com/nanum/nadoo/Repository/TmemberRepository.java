package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Entity.Tmember;
import com.nanum.nadoo.Entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TmemberRepository extends JpaRepository<Tmember, Long> {

    @Query(value = "select count(*) from tmember where trade_idx = :tradeIdx", nativeQuery = true)
    Long countTmem(@Param(value = "tradeIdx") Long tradeIdx);

    @Query(value = "select count(t) from Tmember t where t.TradeVO = :tradeVO")
    int getJoinCountByTradeIdx(@Param(value = "tradeVO") Trade tradeVO);


}
