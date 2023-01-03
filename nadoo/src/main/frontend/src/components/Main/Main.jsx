import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTop from '../Navigator/NavigatorTop';
import '../../styles/Main/Main.css';
import styled from 'styled-components';
import Slider from '../Slider/Slider';
import day from '../../static/HHJ/images/Group 40.svg';
import recycle from '../../static/HHJ/images/Group 43.svg';
import together from '../../static/HHJ/images/Group 45.svg';
import mega from '../../static/HHJ/images/Group 47.svg';
import GroupList from '../Group/GroupList';
import GroupListAll from '../Group/GroupListAll';
import GroupCloser from '../Group/GroupCloser';

// const Background = styled.div`
//   background-color: whitesmoke;
// `

function Main() {
  const location = useLocation();
  const url = location.pathname;

  if (url === '/') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <div className='Main_guideImg'>
          <div>
            <Slider />
          </div>
          <br />
          <div className='Main_iconDiv'>
            <div className='Main_iconIfo'>
              <img
                className='Main_icon'
                alt='undefind'
                src={together}
              />
              <br />
              <p className='Main_iconText'>나두 일정</p>
            </div>
            <div className='Main_iconIfo'>
              <img
                className='Main_icon'
                alt='undefind'
                src={recycle}
              />
              <br />
              <p className='Main_iconText'>나두 교환</p>
            </div>
            <div className='Main_iconIfo'>
              <img
                className='Main_icon'
                alt='undefind'
                src={mega}
              />
              <br />
              <p className='Main_iconText'>나두 함께</p>
            </div>
            <div className='Main_iconIfo'>
              <img
                className='Main_icon'
                alt='undefind'
                src={day}
              />
              <br />
              <p className='Main_iconText'>나두 공지</p>
            </div>
          </div>
          <br />
          <br />
          <span className='Main_endSoon'>
            ⏰ 종료 임박 ⏰
            {/* 🚨⏰❗ */}
          </span>
          <br />
          <br />
        </div>
        <GroupCloser />
        <div className='Main_guideImg'>
          <span className='Main_endSoon'>
            👋 최신 나두 👋
            {/* 🚨⏰❗ */}
          </span>
          <br />
          <br />
          <GroupList />
        </div>
        <NavigatorMain />
        <Outlet />
      </>
    );
  }
  else if (url === '/mypage') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        mypage
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/grouplist') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <GroupListAll />
        <NavigatorMain />
        <Outlet />
      </>
    );
  }
}

export default Main;