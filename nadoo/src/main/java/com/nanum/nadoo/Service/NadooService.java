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

    // 상세 거래 서비스
    public TradeDetailDTO getDetail(Long tradeIdx) {
        TradeDetailDTO trade = tradeRepository.findDetailTrade(tradeIdx);
        return trade;
    }
    
    // 최근 나두 서비스
    public Map<String, Object> getRecentTrades() {
        List<TradePreviewDTO> list = tradeRepository.findRecentTrades();
        int size = list.size();
        int limit = 10; // 최근 나두 갯수 제한

        if(list.size() > limit){
            size = limit;
        }
        list = list.subList(0, size);

        int addressSize = 2;// 주소 두번째까지만 제한

        for(TradePreviewDTO dto : list){
            String resultAddress = "";
            String[] temp = dto.getTradeAddress().split(" ");
            // 혹시 제한개수보다 작은값이면 그대로 표출
            if(temp.length < addressSize) {
                dto.setTradeAddress(dto.getTradeAddress());
            }
            else{
                for(int i = 0; i < addressSize; i++){
                    resultAddress += (temp[i] + " ");
                }
            }
            dto.setTradeAddress(resultAddress);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("recentTrades", list);
        return map;
    }

    // 종료 임박 서비스
    public Map<String, Object> getCloserTrades(){
        List<TradePreviewDTO> list = tradeRepository.findCloserTrades();
        int size = list.size();
        int limit = 10; // 종료 임박 갯수 제한

        if(list.size() > limit){
            size = limit;
        }
        list = list.subList(0, size);

        int addressSize = 2;// 주소 두번째까지만 제한
        for(TradePreviewDTO dto : list){
            String resultAddress = "";
            String[] temp = dto.getTradeAddress().split(" ");
            // 혹시 제한개수보다 작은값이면 그대로 표출
            if(temp.length < addressSize) {
                dto.setTradeAddress(dto.getTradeAddress());
            }
            else{
                for(int i = 0; i < addressSize; i++){
                    resultAddress += (temp[i] + " ");
                }
            }
            dto.setTradeAddress(resultAddress);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("closerTrades", list);
        return map;
    }

    // 모든 거래 불러오기
    public Map<String, Object> getAllTrades() {
        List<TradePreviewDTO> list = tradeRepository.findRecentTrades();

        int addressSize = 2;// 주소 두번째까지만 제한

        for(TradePreviewDTO dto : list){
            String resultAddress = "";
            String[] temp = dto.getTradeAddress().split(" ");
            // 혹시 제한개수보다 작은값이면 그대로 표출
            if(temp.length < addressSize) {
                dto.setTradeAddress(dto.getTradeAddress());
            }
            else{
                for(int i = 0; i < addressSize; i++){
                    resultAddress += (temp[i] + " ");
                }
            }
            dto.setTradeAddress(resultAddress);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("tradeAll", list);
        return map;
    }
}
