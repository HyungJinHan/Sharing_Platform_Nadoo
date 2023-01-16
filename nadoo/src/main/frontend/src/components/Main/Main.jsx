import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTop from '../Navigator/NavigatorTop';
import GroupListAll from '../Group/GroupListAll';
import MainShape from './MainShape';
import SearchPage from '../Search/Search';
import shortid from 'shortid';
import UserMyPage from '../UserMyPage/UserMyPage';
import GroupChat from '../Group/GroupChat';
import GroupChatList from '../Group/GroupChatList';
import NavigatorTopChat from '../Navigator/NavigatorTopChat';

// const Background = styled.div`
//   background-color: whitesmoke;
// `

function Main({
  idxState,
  detailTitle
}) {
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
  // const [userTag1, setUserTag1] = useState('#' + shortid.generate());
  // const [userTag2, setUserTag2] = useState('#' + shortid.generate());
  // const [userTag3, setUserTag3] = useState('#' + shortid.generate());
  // const [userTag4, setUserTag4] = useState('#' + shortid.generate());
  // const [userTag5, setUserTag5] = useState('#' + shortid.generate());
  // const [userTag6, setUserTag6] = useState('#' + shortid.generate());

  const [test, setTest] = useState('Super');

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
        <SearchPage test={test} setTest={setTest} url={url} />
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === `/groupchatlist`) {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <GroupChatList />
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === `/groupchat/${idxState}`) {
    return (
      <>
        <NavigatorTopChat />
        <Outlet />
        <GroupChat
          idxState={idxState}
          detailTitle={detailTitle}
        />
      </>
    );
  }
}

export default Main;