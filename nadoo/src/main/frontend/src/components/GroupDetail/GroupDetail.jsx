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

  const [groupList, setGroupList] = useState({
    list: []
  });

  function getGroupList() {
    axios
      .post('http://localhost:8088/nadoo/detail', {
        tradesIdx: idxState
      })
      .then((res) => {
        const { data } = res;
        setGroupList({
          list: data
        });
      })
      .catch((e) => {
        console.error(e);
      })
  };

  useEffect(() => {
    getGroupList();
  }, []);

  const groupTitle = '양파 같이 사실 분!'

  console.log(idxState);

  return (
    <>
      <NavigatorTopDetail groupTitle={groupTitle} />
      <Outlet />
      <div className='GroupDetail_mapDiv'>
        <img
          className='GroupDetail_mapImg'
          src={mapImg}
          alt="undefind"
        />
      </div>
      <br />
      <Descriptions bordered>
        <Descriptions.Item label="판매 물품">폼클렌징</Descriptions.Item>
        <Descriptions.Item label="주소">Prepaid</Descriptions.Item>
        <Descriptions.Item label="거래 인원">YES</Descriptions.Item>
        <Descriptions.Item label="주최자">나는한형진</Descriptions.Item>
        <Descriptions.Item label="Status">
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
          Y마트에서 양파 1망 1키로 기준으로 파는데 같이 사실분 구해요ㅠㅠㅠㅠㅠ
        </Descriptions.Item>
      </Descriptions>
      <NavigatorMain />
      <Outlet />
    </>
  );
}

export default GroupDetail;