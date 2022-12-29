package com.nanum.nadoo.Service;

import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Dto.TradePreviewDTO;
import com.nanum.nadoo.Repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NadooService{
    @Autowired
    TradeRepository tradeRepository;

    public TradeDetailDTO getDetail(Long tradeIdx) {
        TradeDetailDTO trade = tradeRepository.findDetailTrade(tradeIdx);
        return trade;
    }
    
    // 수정 요함
    public Map<String, Object> getRecentTrades() {
        List<TradePreviewDTO> list = tradeRepository.findRecentTrades();
        Map<String, Object> map = new HashMap<String, Object>();
        int limit = list.size();
        if(list.size() > 15){
            limit = 15;
        }
        map.put("recentTrades", list.subList(0,limit));
        return map;
    }

    public Map<String, Object> getCloserTrades(){
        List<TradePreviewDTO> list = tradeRepository.findCloserTrades();
        Map<String, Object> map = new HashMap<String, Object>();
        int limit = list.size();
        if(list.size() > 15){
            limit = 15;
        }
        map.put("closerTrades", list.subList(0,limit));
        return map;
    }

}
