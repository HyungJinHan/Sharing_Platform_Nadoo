import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTop from '../Navigator/NavigatorTop';
import GroupListAll from '../Group/GroupListAll';
import MainShape from './MainShape';
import SearchPage from '../Search/Search';
import shortid from 'shortid';
import SocialLogin from '../SocialLogin/SocialLogin';
import UserMyPage from '../UserMyPage/UserMyPage';

// const Background = styled.div`
//   background-color: whitesmoke;
// `

function Main() {
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
  // const [userTag1, setUserTag1] = useState('#' + shortid.generate());
  // const [userTag2, setUserTag2] = useState('#' + shortid.generate());
  // const [userTag3, setUserTag3] = useState('#' + shortid.generate());
  // const [userTag4, setUserTag4] = useState('#' + shortid.generate());
  // const [userTag5, setUserTag5] = useState('#' + shortid.generate());
  // const [userTag6, setUserTag6] = useState('#' + shortid.generate());

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
        <UserMyPage />
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