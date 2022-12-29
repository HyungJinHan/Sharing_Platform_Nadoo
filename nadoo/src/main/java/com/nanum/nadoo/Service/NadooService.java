package com.nanum.nadoo.Service;

import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NadooService{

    @Autowired
    TradeRepository tRepository;

    public List<Trade> getRecentTrades() {
        List<Trade> list = tRepository.findAllByOrderByTradeStarttimeDesc();
        return list;
    }

    public List<Trade> getCloserTrades(){
        List<Trade> list = tRepository.findAllByOrderByTradeEndtimeAsc();
        return list;
    }
}
