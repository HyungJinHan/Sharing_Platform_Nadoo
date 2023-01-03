import React from 'react';
import "../../styles/UserMyPage/UserMyPage.css"
import styled from "styled-components";
import { Outlet, useLocation } from 'react-router-dom';
import UserMyPageList from './UserMyPageList';
import UserMyPageWishList from './UserMyPageWishList';
import UserMyPageNotice from './UserMyPageNotice';
import UserMyPagePurchased from './UserMyPagePurchased';
import UserMyPageCustomer from './UserMyPageCustomer';
import NavigatorTop from '../Navigator/NavigatorTop';
import NavigatorMain from '../Navigator/NavigatorMain';

const UserMyPageCenter = styled.div`
  text-align: center;
  width: 90%;
  margin: 0 auto;
`

function UserMyPage(props) {
  const location = useLocation();
  const url = location.pathname;

  if (url === '/mypage') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <UserMyPageCenter>
          <UserMyPageList />
        </UserMyPageCenter>
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/wishlist') {
    return (
      <UserMyPageCenter>
        <UserMyPageWishList />
      </UserMyPageCenter>
    );
  } else if (url === '/customer') {
    return (
      <UserMyPageCenter>
        <UserMyPageCustomer />
      </UserMyPageCenter>
    );
  } else if (url === '/notice') {
    return (
      <UserMyPageCenter>
        <UserMyPageNotice />
      </UserMyPageCenter>
    );
  } else if (url === '/purchased') {
    return (
      <UserMyPageCenter>
        <UserMyPagePurchased />
      </UserMyPageCenter>
    );
  }
}

export default UserMyPage;