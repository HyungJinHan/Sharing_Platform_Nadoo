package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findAll();

    // 전 : select t from Trade t;
    // select new com.nanum.nadoo.Dto.dto이름(t.tradeTitle, u.userNick) from Trade t, User u where t.tradeMasterVO = u
    @Query(value = "select new com.nanum.nadoo.Dto.TradeDetailDTO(" +
            "t.tradeIdx, t.tradeAddress, t.tradeTitle, t.tradeContent, u.userNick, " +
            "t.tradeProduct, t.tradePrice, t.tradeStarttime, t.tradeEndtime, " +
            " t.tradeMax, t.tradeType, t.tradeViews) " +
            "from Trade t, User u where t.tradeMasterVO = u and t.tradeIdx=:tradeIdx")
    TradeDetailDTO findDetailTrade(@Param(value="tradeIdx") Long tradeIdx);
}