package com.nanum.nadoo.Repository;

import com.nanum.nadoo.Dto.ChatDTO;
import com.nanum.nadoo.Entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    // @Query("select c from Chat c where c.tradeIdx = :tradeIdx")
    // List<Chat> findByTradeIdx(@Param(value="tradeIdx")Long tradeIdx);
    List<Chat> findAll();

//    @Query(value = "select new com.nanum.nadoo.Dto.ChatDTO(" +
//            "c.chatIdx, c.chatContent, t.tradeIdx) " +
//            "from Trade t, Chat c where c.tradeVO = t and c.tradeVO.tradeIdx = :tradeIdx ")
//    List<ChatDTO> findChat(@Param(value = "tradeIdx") Long tradeIdx);



    // @Query(value="insert Chat(chat_content) values(:jsonString)", nativeQuery =
    // true)
    // @Modifying
    // Category insertMessage(@Param(value="jsonString") String jsonString);
    // @Query(value = "insert chat(chat_content, chat_type) values(:message,
    // 'send')", nativeQuery = true)
    // void insertMessageSend(@Param(value = "message") String message);
}