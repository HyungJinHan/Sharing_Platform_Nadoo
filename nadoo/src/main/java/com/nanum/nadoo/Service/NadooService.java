package com.nanum.nadoo.Service;

import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Dto.TradePreviewDTO;
import com.nanum.nadoo.Entity.Category;
import com.nanum.nadoo.Entity.Tmember;
import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Entity.User;
import com.nanum.nadoo.Repository.TmemberRepository;
import com.nanum.nadoo.Repository.TradeRepository;
import com.nanum.nadoo.Repository.UserRepository;
import com.nanum.nadoo.Repository.CategoryRepository;
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

    @Autowired
    CategoryRepository categoryRepository;

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

    // 로그인 정보 체크
    public Map<String, Object> loginCheck(String userAccount) {
        User findUser = userRepository.findByUserAccount(userAccount);
        Map<String, Object> map = new HashMap<String, Object>();
        if(findUser == null){
            map.put("loginCheck", null);
        }
        else{
            map.put("loginCheck", findUser);
        }
        return map;
    }

    public void createTrade(Trade tradeVO){
        // 받아온 trade객체를 저장해주기(Insert)
        tradeRepository.save(tradeVO);
    }
    public Category findCategory(Long categoryIdx) {
        return categoryRepository.findByCategoryIdx(categoryIdx);   // 레포지토리에서 해당 category객체를 찾아서 반환
    }
    // 계정으로 유저 객체 찾기
    public User findUser(String userAccount) {
        return userRepository.findByUserAccount(userAccount);
    }

    // 해당 거래에 참여하고 있는 인원 반환
    public Map<String, Object> joinCount(Long tradeIdx){
        Trade tradeVO = tradeRepository.findByTradeIdx(tradeIdx);   // 받아온 tradeIdx로 trade객체 찾기

        Map<String, Object> map = new HashMap<>();
        map.put("참여 인원", tmemberRepository.getJoinCountByTradeIdx(tradeVO));     // 해당 거래의 참여중인 인원 수 반환
        map.put("최대 참여 가능 수", tradeVO.getTradeMax());                           // 해당 거래의 최대 참여 인원 수 반환
        return map;   // 참여 중인 인원 반환
    }

}
