import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../../styles/Navigator/NavigatorTop.css'
import styled from "styled-components";
import Logo from '../../static/HHJ/images/NADOO_v2.svg'

const NavCenter = styled.div`
  text-align: center;
  padding-top: 3.75rem;
`;

function NavigatorTop(props) {
  const navigate = useNavigate();
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

  // if (url === '/groupdetail') {
  //   setTitle('title');
  // } else if (url === '/') {
  //   setTitle('Main');
  // } else if (url === '/search') {
  //   setTitle('search');
  // } else if (url === '/mypage') {
  //   setTitle('mypage');
  // } else {
  //   setTitle('Nadoo');
  // }

  return (
    <NavCenter>
      <div
        className={
          scroll === true ?
            'Navigator_topbar'
            :
            'Navigator_topbarScroll'
        }
      >
        {
          scroll === true ?
            <>
              <span className='Navigator_topfont1'>
                Ma
              </span>
              <span className='Navigator_topfont2'>
                in
              </span>
            </>
            :
            <>
              <span className='Navigator_topfont1'>
                NA
              </span>
              <span className='Navigator_topfont2'>
                DOO
              </span>
            </>
        }
      </div>
    </NavCenter>
  );
}

export default NavigatorTop;