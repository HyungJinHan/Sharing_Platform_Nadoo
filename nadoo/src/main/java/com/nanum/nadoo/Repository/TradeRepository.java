package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Dto.TradePreviewDTO;
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
        // select new com.nanum.nadoo.Dto.dto이름(t.tradeTitle, u.userNick) from Trade t,
        // User u where t.tradeMasterVO = u
        @Query(value = "select new com.nanum.nadoo.Dto.TradeDetailDTO(" +
                        "t.tradeIdx, t.tradeAddress, t.tradeTitle, t.tradeContent, u.userNick, " +
                        "t.tradeProduct, t.tradePrice, t.tradeStarttime, t.tradeEndtime, " +
                        "t.tradeMax, t.tradeType, t.tradeViews, t.tradeCheck, u.userAccount, unix_timestamp(t.tradeEndtime)) " // t.tradeCheck
                                                                                                                               // 추가
                        +
                        "from Trade t, User u where t.tradeMasterVO = u and t.tradeIdx=:tradeIdx")
        TradeDetailDTO findDetailTrade(@Param(value = "tradeIdx") Long tradeIdx);

        List<Trade> findFirst4ByOrderByTradeStarttimeDesc();

        // 거래내용 등록일순 내림차순
        @Query(value = "select new com.nanum.nadoo.Dto.TradePreviewDTO(" +
                        "t.tradeIdx, t.tradeTitle, u.userNick, " +
                        "t.tradeProduct, t.tradeAddress, t.tradePrice, t.tradeStarttime, t.tradeEndtime, unix_timestamp(t.tradeEndtime) - unix_timestamp(now())) "
                        +
                        "from Trade t, User u where t.tradeMasterVO = u order by t.tradeStarttime desc")
        List<TradePreviewDTO> findRecentTrades();

        // 거래내용 종료일순 오름차순
        @Query(value = "select new com.nanum.nadoo.Dto.TradePreviewDTO(" +
                        "t.tradeIdx, t.tradeTitle, u.userNick, " +
                        "t.tradeProduct, t.tradeAddress, t.tradePrice, t.tradeStarttime, t.tradeEndtime, unix_timestamp(t.tradeEndtime) - unix_timestamp(now())) "
                        +
                        "from Trade t, User u where t.tradeMasterVO = u order by t.tradeEndtime asc")
        List<TradePreviewDTO> findCloserTrades();

        Trade findByTradeIdx(Long tradeIdx); // 거래 모임 순번으로 Trade select

        @Query(value = "update trade set trade_check=0 where trade_idx = :tradeIdx", nativeQuery = true)
        void changeTradeCheck(@Param(value = "tradeIdx") Long tradeIdx);
}