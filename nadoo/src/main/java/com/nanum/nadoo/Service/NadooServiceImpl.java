package com.nanum.nadoo.Service;

import com.nanum.nadoo.Dto.TradePreviewDTO;
import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NadooServiceImpl implements NadooService{

    @Autowired
    TradeRepository tRepository;

    @Override
    public Map<String, Object> getRecentTrades() {
        List<TradePreviewDTO> list = tRepository.findRecentTrades();
        Map<String, Object> map = new HashMap<String, Object>();
        int limit = list.size();
        if(list.size() > 15){
            limit = 15;
        }
        map.put("recentTrades", list.subList(0,limit));
        return map;
    }

    @Override
    public Map<String, Object> getCloserTrades(){
        List<TradePreviewDTO> list = tRepository.findCloserTrades();
        Map<String, Object> map = new HashMap<String, Object>();
        int limit = list.size();
        if(list.size() > 15){
            limit = 15;
        }
        map.put("closerTrades", list.subList(0,limit));
        return map;
    }
}
