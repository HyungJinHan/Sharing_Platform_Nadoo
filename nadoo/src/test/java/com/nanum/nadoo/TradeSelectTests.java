package com.nanum.nadoo;

import com.nanum.nadoo.Dto.TradePreviewDTO;
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

	// @Transactional
	// @Test
	// void selectTradeListStartTimeDesc() {
	// List<Trade> result = tRepository.findAllByOrderByTradeStarttimeDesc();
	// for(int i = 0; i < result.size(); i++){
	// System.out.println(result.get(i));
	// }
	// }

//	@Transactional
//	@Test
//	void selectTradeListEndTimeAsc() {
//		List<TradePreviewDTO> result = tRepository.findRecentTrades();
//		for (int i = 0; i < result.size(); i++) {
//			System.out.println(result.get(i));
//		}
//	}


	@Transactional
	@Test
	void splitTradeAddress(){
		List<TradePreviewDTO> list = tRepository.findRecentTrades();
		for(TradePreviewDTO dto : list){
			String[] temp = dto.getTradeAddress().split(" ");
			System.out.println(temp[0] + " " + temp[1]);
		}
	}
}
