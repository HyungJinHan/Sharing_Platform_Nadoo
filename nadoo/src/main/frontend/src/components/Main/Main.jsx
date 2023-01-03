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

// const Background = styled.div`
//   background-color: whitesmoke;
// `

function Main() {
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
  const [userTag1, setUserTag1] = useState('#' + shortid.generate());
  const [userTag2, setUserTag2] = useState('#' + shortid.generate());
  const [userTag3, setUserTag3] = useState('#' + shortid.generate());
  const [userTag4, setUserTag4] = useState('#' + shortid.generate());
  const [userTag5, setUserTag5] = useState('#' + shortid.generate());
  const [userTag6, setUserTag6] = useState('#' + shortid.generate());

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
        나는한형진{userTag1}
        <br />
        <br />
        나는민윤기{userTag2}
        <br />
        <br />
        나는배수진{userTag3}
        <br />
        <br />
        나는백하늘{userTag4}
        <br />
        <br />
        나는김유리{userTag5}
        <br />
        <br />
        나는김민정{userTag6}
        <br />
        <br />
        <SocialLogin />
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