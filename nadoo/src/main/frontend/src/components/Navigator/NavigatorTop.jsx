import { useNavigate } from 'react-router-dom';
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
                여기는&nbsp;
              </span>
              <span className='Navigator_topfont2'>
                메인
              </span>
            </>
            :
            <img
              className='Navigator_toplogo'
              src={Logo}
              alt="undefind"
              onClick={
                () => {
                  navigate('/');
                }
              }
            />
        }
      </div>
    </NavCenter>
  );
}

export default NavigatorTop;