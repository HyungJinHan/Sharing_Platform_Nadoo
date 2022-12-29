package com.nanum.nadoo.Service;

import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NadooService{
    @Autowired
    TradeRepository tradeRepository;

    public TradeDetailDTO getDetail(Long tradeIdx) {
        TradeDetailDTO trade = tradeRepository.findDetailTrade(tradeIdx);
        return trade;
    }
}
