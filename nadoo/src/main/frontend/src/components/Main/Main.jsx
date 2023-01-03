import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTop from '../Navigator/NavigatorTop';
import GroupListAll from '../Group/GroupListAll';
import MainShape from './MainShape';
import SearchPage from '../Search/Search';

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
        <MainShape />
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/mypage') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <input
          type={'button'}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            position: 'fixed',
            bottom: '80px',
            right: '10px'
          }}
          value={'mypage'}
        />
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />mypage
        <br />
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
  } else if (url === '/search') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <SearchPage />
        <NavigatorMain />
        <Outlet />
      </>
    );
  }
}

export default Main;