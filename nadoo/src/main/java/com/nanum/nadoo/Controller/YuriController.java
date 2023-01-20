
package com.nanum.nadoo.Controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.nanum.nadoo.Dto.TradeDetailDTO;
import com.nanum.nadoo.Entity.Category;
import com.nanum.nadoo.Entity.Trade;
import com.nanum.nadoo.Entity.User;
import com.nanum.nadoo.Entity.Wishlist;
import com.nanum.nadoo.Repository.TradeRepository;
import com.nanum.nadoo.Service.NadooService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@Log4j2
public class YuriController {

  @Autowired
  NadooService service;

  @Autowired
  private TradeRepository tradeRepository;

  @RequestMapping("/nadoo/createTrade")
  public void createTrade(@RequestBody Map<String, Object> newTrade) throws ParseException { // map데이터타입 매개변수
    // log.info();
    // map쓰는 이유 : 받는 타입이 그런식임 ㅎㅎ
    // 시간 타입은 받아올때 String 타입으로 HH:MM:DD HH:mm:ss(HH:mm)식으로 받을 예정
    // String -> Date타입으로 바꿔ㅕ주는 자바 라이브러리가 있을거임
    // HH;mm으로 받아지면은 뒤에다가 :00붙여서 HH:mm:ss형식으로 맞춰주기
    // log.info(newTrade);

    Trade tradeVO = new Trade();
    // 거래주소
    tradeVO.setTradeAddress((String) newTrade.get("tradeAddress"));
    // 거래타입
    tradeVO.setTradeType((String) newTrade.get("tradeType"));

    // 거래시간
    // Date tradeEndtime = (Date)newTrade.get("tradeEndtime");
    String str = newTrade.get("tradeEndtime") + ":00.000000";
    Date tradeEndtime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(str);
    tradeVO.setTradeEndtime(tradeEndtime);

    // 거래인원
    // 오류가 발생해서 int와 long에 대한 형변환을 해줬다
    int tradeMax = Integer.parseInt((String) newTrade.get("tradeMax"));
    tradeVO.setTradeMax(tradeMax);

    // 글 제목
    tradeVO.setTradeTitle((String) newTrade.get("tradeTitle"));

    // 글 내용
    tradeVO.setTradeContent((String) newTrade.get("tradeContent"));

    // pk를 통해서 카테고리VO를 찾는 레포지토리 메소드를 통해서 받는거
    Long categoryIdx = Long.valueOf((String) newTrade.get("categoryIdx"));
    Category categoryVO = service.findCategory(categoryIdx);
    tradeVO.setTradeCategoryVO(categoryVO);

    User userVO = service.findUser((String) newTrade.get("userAccount"));
    tradeVO.setTradeMasterVO(userVO);

    tradeVO.setTradeProduct((String) newTrade.get("tradeProduct"));

    int tradePrice = Integer.parseInt((String) newTrade.get("tradePrice"));
    tradeVO.setTradePrice(tradePrice);

    // tradeVO를 완성
    service.createTrade(tradeVO);
  }


  // 위시 리스트 추가
  @RequestMapping ("/nadoo/addWishList")
  public void addMyWishList(@RequestBody Map<String, Object> wishList) throws ParseException {
    Wishlist wishVO = new Wishlist();
    int check = 0;
    check = Integer.parseInt((String)wishList.get("check"));

    // 추가
    if(check ==1) {
      Trade tradeVO = tradeRepository.findByTradeIdx((Long.valueOf((String) wishList.get("tradeIdx"))));
      User userVO = service.findUser((String) wishList.get("userAccount"));
      wishVO.setTradeVO(tradeVO);
      wishVO.setUserVO(userVO);
      log.info(wishVO);
      service.addWishList(wishVO);
    }
    else {
      // wishlistidx찾아서 지우기?
      Trade tradeVO = tradeRepository.findByTradeIdx((Long.valueOf((String) wishList.get("tradeIdx"))));
      User userVO = service.findUser((String) wishList.get("userAccount"));
      wishVO.setTradeVO(tradeVO);
      wishVO.setUserVO(userVO);
      service.deleteWishList(wishVO);
    }
  }

  //위시리스트 목록
  @RequestMapping("/nadoo/allWishList")
  public String allWishList(@RequestParam Map<String, Object> wishList) throws ParseException {
    User userVO = service.findUser((String) wishList.get("userAccount"));
    System.out.println(userVO);
    Map<String, Object> result = service.allWishList(userVO);
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    return gson.toJson(result);
  }

}
