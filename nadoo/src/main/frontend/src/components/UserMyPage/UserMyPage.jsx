import React, { useEffect, useState } from 'react';
import "../../styles/UserMyPage/UserMyPage.css"
import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import UserMyPageList from './UserMyPageList';
import UserMyPageWishList from './UserMyPageWishList';
import UserMyPageNotice from './UserMyPageNotice';
import UserMyPagePurchased from './UserMyPagePurchased';
import UserMyPageCustomer from './UserMyPageCustomer';
import NavigatorTop from '../Navigator/NavigatorTop';
import NavigatorMain from '../Navigator/NavigatorMain';
import SocialLogin from '../SocialLogin/SocialLogin';

import naver from '../../static/KMJ/images/naver.png';
import kakao from '../../static/KMJ/images/kakao.png';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from '../SocialLogin/SocialLoginOAuth';
import "../../styles/SocialLogin/SocialLogin.css";



const UserMyPageCenter = styled.div`
  text-align: center;
  width: 90%;
  margin: 0 auto;
`

function UserMyPage(props) {
  const location = useLocation();
  const [userID, setUserID] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setUserID(window.sessionStorage.getItem('userID'));
  }, [userID]);

  const url = location.pathname;

  if (url === '/mypage') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <UserMyPageCenter>
          <SocialLogin />
          <UserMyPageList />
        </UserMyPageCenter>
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/wishlist') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <UserMyPageCenter>
          <UserMyPageWishList />
        </UserMyPageCenter>
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/customer') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <UserMyPageCenter>
          <UserMyPageCustomer />
        </UserMyPageCenter>
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/notice') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <UserMyPageCenter>
          <UserMyPageNotice />
        </UserMyPageCenter>
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/purchased') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <UserMyPageCenter>
          <UserMyPagePurchased />
        </UserMyPageCenter>
        <NavigatorMain />
        <Outlet />
      </>
    );
  }
}

export default UserMyPage;