import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../../styles/Navigator/NavigatorTop.css'
import styled from "styled-components";

const NavCenter = styled.div`
  text-align: center;
  padding-top: 3.75rem;
`;

function NavigatorTop({
  detailUrl
}) {
  // const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [title, setTitle] = useState('');
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 10) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  useEffect(() => {
    if (detailUrl === '/groupdetail') {
      setTitle('나두 상세정보');
    } else if (url === '/search') {
      setTitle('나두 검색');
    } else if (url === '/mypage') {
      setTitle('마이 페이지');
    } else if (url === '/grouplist') {
      setTitle('나두 목록');
    } else if ('/') {
      setTitle('메인 나두');
    }
  }, [title]);

  return (
    <NavCenter>
      {
        scroll === true ?
          <div
            className='Navigator_topbar'
          >
            <span className='Navigator_topfont1'>
              NA
            </span>
            <span className='Navigator_topfont2'>
              DOO
            </span>
          </div>
          :
          <div
            className='Navigator_topbarScroll'
          >
            <span className='Navigator_topfont2'>
              NA
            </span>
            <span className='Navigator_topfont1'>
              DOO
            </span>
          </div>
      }
    </NavCenter>
  );
}

export default NavigatorTop;