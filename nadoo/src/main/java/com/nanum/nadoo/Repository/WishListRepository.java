package com.nanum.nadoo.Repository;
import com.nanum.nadoo.Dto.TradePreviewDTO;
import com.nanum.nadoo.Entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<Wishlist, Long> {

    // 유저 계정과 글 번호에 맞는 위시리스트 번호 찾기
    @Query(value = "select wishlist_idx from wishlist where user_account = :userAccount AND trade_idx = :tradeIdx",nativeQuery = true)
    Long findWishlistIdx(String userAccount, Long tradeIdx);

    // 유저 계정에 해당되는 위시리스트 테이블 안 글 번호 다 가져오기
    @Query(value = "select trade_idx from wishlist where user_account = :userAccount",nativeQuery = true)
    List<Long> findMyWishList(String userAccount);

    // 글 번호에 맞는 글 내용 가져오기
    @Query(value = "select new com.nanum.nadoo.Dto.TradePreviewDTO(" +
            "t.tradeIdx, t.tradeTitle, u.userNick, " +
            "t.tradeProduct, t.tradeAddress, t.tradePrice, t.tradeStarttime, t.tradeEndtime, unix_timestamp(t.tradeEndtime) - unix_timestamp(now())) "
            +
            "from Trade t, User u where t.tradeMasterVO = u AND t.tradeIdx = :tradeIdx order by t.tradeStarttime desc")
    List<TradePreviewDTO> findByTradeVO(@Param("tradeIdx") Long tradeIdx);
}

