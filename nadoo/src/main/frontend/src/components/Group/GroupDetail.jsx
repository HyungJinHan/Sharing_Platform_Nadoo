import React, { useEffect, useState } from 'react';
import { Badge, Button, Descriptions, Space } from 'antd';
import NavigatorTop from '../Navigator/NavigatorTop';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Group/GroupDetail.css'
import NavigatorMain from '../Navigator/NavigatorMain';
import axios from 'axios';
import KakaoMapContainer from '../KakaoMap/KakaoMapContainer';
import GroupChat from './GroupChat';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import WishList from '../WishList/WishList';

const ButtonCenter = styled.div`
  text-align: center;
`

function GroupDetail({
  detailNum,
  detailTitle
}) {
  var [time, setTime] = useState(0);
  const [toggleButton, setToggleButton] = useState(false);
  const location = useLocation();
  const originUrl = location.pathname;
  const url = originUrl.substring(0, 12);
  const navigate = useNavigate();

  const idxState = location.state.tradeIdx;

  // console.log(idxState);

  const [detailArticle, setDetailArticle] = useState([
    {
      tradeAddress: '',
      tradeTitle: '',
      tradeContent: '',
      userNick: '',
      tradeProduct: '',
      tradePrice: '',
      tradeMax: '',
      tradeViews: '',
      diffTime: ''
    }
  ]);

  function getGroupList() {
    axios
      .post('http://localhost:8088/nadoo/detail', {
        //.post(`http://localhost:8088/nadoo/detail/${idxState}`, {
        tradeIdx: idxState
      })
      .then((res) => {
        setDetailArticle(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
      })
  };

  useEffect(() => {
    getGroupList();
  }, []);

  const originPrice = detailArticle.tradePrice;

  const price = [originPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const timeCount = parseInt((detailArticle.diffTime - (Date.now() / 1000)));

  var day = Math.floor(timeCount / (24 * 3600))
  var hour = Math.floor(timeCount % (24 * 3600) / 3600)
  var minute = Math.floor((timeCount % 3600) / 60);
  var second = timeCount % 60;

  useEffect(() => {
    var timer = setInterval(() => {
      if (timeCount > 0) {
        setTime(timeCount);
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }, [timeCount]);

  return (
    <>
      <NavigatorTop detailUrl={url} />
      <Outlet />
      <KakaoMapContainer tradeAddress={detailArticle.tradeAddress} />
      <br />

      &nbsp;
      &nbsp;
      &nbsp;

      <WishList
        style={{ fontSize: '20px' }}
      />
      &nbsp;
      &nbsp;
      {detailArticle.tradeTitle}
      <br />
      <br />

      <Descriptions
        className='GroupDetail_article'
        // title={detailArticle.tradeTitle}
        bordered
      >



        <Descriptions.Item label="판매 물품">
          {detailArticle.tradeProduct}
        </Descriptions.Item>
        <Descriptions.Item label="남은 시간">
          {
            timeCount === 0 || timeCount <= 0 ?
              <>
                <span className='GroupDetail_day'>
                  거래가&nbsp;
                </span>
                <span className='GroupDetail_timer'>
                  종료되었습니다.
                </span>
              </>
              :
              <>
                <span className='GroupDetail_day'>
                  {day < 10 ? `0${day}` : day}일&nbsp;
                </span>
                <span className='GroupDetail_timer'>
                  {hour < 10 ? `0${hour}` : hour}:
                  {minute < 10 ? `0${minute}` : minute}:
                  {second < 10 ? `0${second}` : second}
                </span>

              </>
          }
        </Descriptions.Item>
        <Descriptions.Item label="거래 주소">
          {detailArticle.tradeAddress}
        </Descriptions.Item>
        <Descriptions.Item label="거래 인원">
          {detailArticle.tradeMax}
        </Descriptions.Item>
        <Descriptions.Item label="주최자">
          {detailArticle.userNick}
        </Descriptions.Item>
        <Descriptions.Item label="조회수">
          {detailArticle.tradeViews}
        </Descriptions.Item>
        <Descriptions.Item label="거래 가격">
          {
            detailArticle.tradePrice === 0 ?
              '만나서 정하고 싶어요!'
              :
              `${price}원`
          }
        </Descriptions.Item>
        {/* {console.log(detailArticle.userAccount)} */}
        {
          detailArticle.userAccount === window.sessionStorage.getItem('userID') ?
            <Descriptions.Item label="거래 상태">
              나두의 주최자입니다!
            </Descriptions.Item>
            :
            <Descriptions.Item label="거래 상태">
              {
                toggleButton === true ?
                  <Badge status="error" text="거래 중지" />
                  :
                  <Badge status="processing" text="거래 허용" />
              }
              &nbsp;
              &nbsp;
              &nbsp;
              <Space wrap>
                <Button
                  style={{
                    width: '100%'
                  }}
                  type="dashed"
                  onClick={
                    () => {
                      setToggleButton(!toggleButton);
                    }
                  }
                >
                  거래 상태 변경
                </Button>
              </Space>
            </Descriptions.Item>
        }
        <Descriptions.Item label="상세 내용">
          {detailArticle.tradeContent}
        </Descriptions.Item>
      </Descriptions>
      {/* <GroupChaž
        idxState={idxState}
        detailNum={detailNum}
        detailTitle={detailTitle}
      /> */}
      <br />
      <ButtonCenter>
        <Button
          type="primary"
          onClick={
            () => {
              if (window.sessionStorage.getItem('userID') === '' ||
                window.sessionStorage.getItem('userID') === undefined ||
                window.sessionStorage.getItem('userID') === null) {
                Swal.fire('로그인 후 이용이 가능합니다.');
              } else {
                navigate(`/groupchat/${detailNum}`);
              }
            }
          }
        >
          채팅 방으로
        </Button>
      </ButtonCenter>
      <NavigatorMain />
      <Outlet />
    </ >
  );
}

export default GroupDetail;