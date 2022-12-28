import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BiSearch, BiHomeAlt } from 'react-icons/bi';
import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTop from '../Navigator/NavigatorTop';
import Slider from '../Slider/Slider';

function Main(props) {
  const location = useLocation();
  const url = location.pathname;
  console.log(location.pathname);

  if (url === '/test') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        test
        <BiSearch
        />
        <BiHomeAlt
        />
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/main') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        <span>메인 메인 메인 메인 메인 메인</span>
        <br />
        <br />
        <Slider />
        <br />
        <br />
        한형진
        <br />
        <br />
        <br />
        <br />
        메인
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        main
        <br />
        <br />
        <br />
        <br />
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/mypage') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        mypage
        <NavigatorMain />
        <Outlet />
      </>
    );
  } else if (url === '/wish') {
    return (
      <>
        <NavigatorTop />
        <Outlet />
        wish
        test end
        <NavigatorMain />
        <Outlet />
      </>
    );
  }
}

export default Main;