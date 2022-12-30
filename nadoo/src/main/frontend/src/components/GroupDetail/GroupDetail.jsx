import React, { useEffect, useState } from 'react';
import { Badge, Button, Descriptions, Space } from 'antd';
import NavigatorTop from '../Navigator/NavigatorTop';
import { Outlet, useLocation } from 'react-router-dom';
import '../../styles/GroupDetail/GroupDetail.css'
import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTopDetail from '../Navigator/NavigatorTopDetail';
import mapImg from '../../static/HHJ/images/testMap.jpg'
import axios from 'axios';

function GroupDetail({
  tradeIdx
}) {
  const [toggleButton, setToggleButton] = useState(false);
  const location = useLocation();

  const idxState = location.state.tradeIdx;

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
    }
  ]);

  function getGroupList() {
    axios
      .post(`http://localhost:8088/nadoo/detail/${idxState}`, {
        tradeIdx: idxState
      })
      .then((res) => {
        setDetailArticle(res.data);
      })
      .catch((e) => {
        console.error(e);
      })
  };

  useEffect(() => {
    getGroupList();
  }, []);

  console.log(idxState);

  return (
    <>
      <NavigatorTopDetail />
      <Outlet />
      <div className='GroupDetail_mapDiv'>
        <img
          className='GroupDetail_mapImg'
          src={mapImg}
          alt="undefind"
        />
      </div>
      <br />
      <Descriptions title={detailArticle.tradeTitle} bordered>
        <Descriptions.Item label="판매 물품">{detailArticle.tradeProduct}</Descriptions.Item>
        <Descriptions.Item label="거래 주소">{detailArticle.tradeAddress}</Descriptions.Item>
        <Descriptions.Item label="거래 인원">{detailArticle.tradeMax}</Descriptions.Item>
        <Descriptions.Item label="주최자">{detailArticle.userNick}</Descriptions.Item>
        <Descriptions.Item label="조회수">{detailArticle.tradeViews}</Descriptions.Item>
        <Descriptions.Item label="거래 가격">
          {/* {detailArticle.tradePrice.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원 */}
          {detailArticle.tradePrice}원
        </Descriptions.Item>
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
        <Descriptions.Item label="상세 내용">
          {detailArticle.tradeContent}
        </Descriptions.Item>
      </Descriptions>
      <NavigatorMain />
      <Outlet />
    </>
  );
}

export default GroupDetail;