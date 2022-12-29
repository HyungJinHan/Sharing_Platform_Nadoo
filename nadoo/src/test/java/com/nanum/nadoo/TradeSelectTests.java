package com.nanum.nadoo;

import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Repository.TradeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
class TradeSelectTests {

	@Autowired
	TradeRepository tRepository;

//	@Transactional
//	@Test
//	void selectTradeListStartTimeDesc() {
//		List<Trade> result = tRepository.findAllByOrderByTradeStarttimeDesc();
//		for(int i = 0; i < result.size(); i++){
//			System.out.println(result.get(i));
//		}
//	}

	@Transactional
	@Test
	void selectTradeListEndTimeAsc(){
		List<Trade> result = tRepository.findAllByOrderByTradeEndtimeAsc();
		for(int i = 0; i < result.size(); i++){
			System.out.println(result.get(i));
		}
	}

}
