import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTop from '../Navigator/NavigatorTop';
import '../../styles/Test/Test.css';
import guideImg from '../../static/HHJ/images/guideClick.png';
import styled from 'styled-components';
import Slider from '../Slider/Slider';
import day from '../../static/HHJ/images/Group 40.svg';
import recycle from '../../static/HHJ/images/Group 43.svg';
import together from '../../static/HHJ/images/Group 45.svg';
import mega from '../../static/HHJ/images/Group 47.svg';
import { Avatar, Card, List } from 'antd';
import SliderGroup from '../Slider/SliderGroup';
import { Pagination } from 'antd';

const Background = styled.div`
  background-color: whitesmoke;
`

function Test() {
  const data = [
    {
      title: 'Ant Design Title 1',
      user: '한형진',
      item: '핸드크림',
      location: '광주 광산구',
    },
    {
      title: 'Ant Design Title 2',
      user: '백하늘',
      item: '딸기',
      location: '광주 북구',
    },
    {
      title: 'Ant Design Title 3',
      user: '배수진',
      item: '안경',
      location: '광주 동구',
    },
    {
      title: 'Ant Design Title 4',
      user: '민윤기',
      item: '커피',
      location: '광주 서구',
    },
    {
      title: 'Ant Design Title 5',
      user: '김유리',
      item: '폼클렌징',
      location: '광주 남구',
    },
    {
      title: 'Ant Design Title 6',
      user: '김민정',
      item: '모니터',
      location: '광주 광산구',
    },
  ];

  return (
    <>
      <NavigatorTop />
      <Outlet />
      <Background>
        <div className='Test_guideImg'>
          <div>
            <Slider />
          </div>
          <br />
          <div className='Test_iconDiv'>
            <div className='Test_iconIfo'>
              <img
                className='Test_icon'
                alt='undefind'
                src={day}
              />
              <br />
              <p className='Test_iconText'>나두 일정</p>
            </div>
            <div className='Test_iconIfo'>
              <img
                className='Test_icon'
                alt='undefind'
                src={recycle}
              />
              <br />
              <p className='Test_iconText'>나두 교환</p>
            </div>
            <div className='Test_iconIfo'>
              <img
                className='Test_icon'
                alt='undefind'
                src={together}
              />
              <br />
              <p className='Test_iconText'>나두 함께</p>
            </div>
            <div className='Test_iconIfo'>
              <img
                className='Test_icon'
                alt='undefind'
                src={mega}
              />
              <br />
              <p className='Test_iconText'>나두 공지</p>
            </div>
          </div>
          <br />
          <br />
          <span className='Test_endSoon'>
            ⏰ 종료 임박 ⏰
            {/* 🚨⏰❗ */}
          </span>
          <br />
          <br />
        </div>
        <SliderGroup />
        <div className='Test_guideImg'>
          <span className='Test_endSoon'>
            👋 최신 나두 👋
            {/* 🚨⏰❗ */}
          </span>
        </div>
        <List
          className='group_list'
          itemLayout="horizontal"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={[
                  item.user, ' | ',
                  item.item, ' | ',
                  item.location
                ]}
              />
            </List.Item>
          )}
        />
      </Background>
      <NavigatorMain />
      <Outlet />
    </>
  );
}

export default Test;