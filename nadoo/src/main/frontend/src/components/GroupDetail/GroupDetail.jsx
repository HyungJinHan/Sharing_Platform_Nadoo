import React, { useState } from 'react';
import { Badge, Descriptions } from 'antd';
import NavigatorTop from '../Navigator/NavigatorTop';
import { Outlet } from 'react-router-dom';
import '../../styles/GroupDetail/GroupDetail.css'
import NavigatorMain from '../Navigator/NavigatorMain';

function GroupDetail(props) {
  const time = 0

  return (
    <>
      <NavigatorTop />
      <Outlet />
      <Descriptions title="양파 같이 사실 분!" bordered>
        <Descriptions.Item label="판매 물품">폼클렌징</Descriptions.Item>
        <Descriptions.Item label="주소">Prepaid</Descriptions.Item>
        <Descriptions.Item label="거래 인원">YES</Descriptions.Item>
        <Descriptions.Item label="주최자">나는한형진</Descriptions.Item>
        <Descriptions.Item label="Status">
          {
            time === 0 ?
              <Badge status="error" text="Close" />
              :
              <Badge status="processing" text="Going" />
          }
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