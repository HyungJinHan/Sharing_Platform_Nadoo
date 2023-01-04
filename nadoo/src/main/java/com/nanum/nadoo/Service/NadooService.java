package com.nanum.nadoo.Service;

import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Dto.TradePreviewDTO;
import com.nanum.nadoo.Entity.Tmember;
import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Repository.TmemberRepository;
import com.nanum.nadoo.Repository.TradeRepository;
import com.nanum.nadoo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NadooService{
    @Autowired
    TradeRepository tradeRepository;

    @Autowired
    TmemberRepository tmemberRepository;

    @Autowired
    UserRepository userRepository;

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

    public void joinTrade(Map<String, Object> map) {

        // 거래 참여자 insert

        Tmember tmember = new Tmember();

        Long tradeIdx = (Long)map.get("tradeIdx");
        String userAccount = (String)map.get("userAccount");
        Trade trade = tradeRepository.findByTradeIdx(tradeIdx);
        tmember.setTradeVO(trade);
        tmember.setUserVO(userRepository.findByUserAccount(userAccount));

        tmemberRepository.save(tmember);

        // 거래 tradeMax와 tmemCount(거래 참여자수 ) 확인
        int tradeMax = trade.getTradeMax();
        Long countTmem =  tmemberRepository.countTmem(tradeIdx);

        // 거래 참여자수가 거래최대수와 같아질때 trade_check=0으로
        if(countTmem == tradeMax){

            tradeRepository.changeTradeCheck(tradeIdx);
        }
    }

}
