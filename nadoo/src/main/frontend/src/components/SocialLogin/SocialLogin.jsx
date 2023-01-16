import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from './SocialLoginOAuth';
import "../../styles/SocialLogin/SocialLogin.css"
import kakao from '../../static/KMJ/images/kakao.png';
import naver from '../../static/KMJ/images/naver.png';

function SocialLogin(props) {
  // const id = window.sessionStorage.getItem('userID');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    setUserID(window.sessionStorage.getItem('userID'));
  }, [userID]);

  return (
    !userID ?
      <div className='login'>
        <a href={KAKAO_AUTH_URL} >
          <div className='kakaoIcon' >
            <img src={kakao}
              alt="카카오"
            />
            카카오 로그인
          </div>
        </a>

        <br />
        <a href={NAVER_AUTH_URL}>
          <div className='naverIcon'>
            <img
              src={naver}
              alt="네이버"
            />
            네이버 로그인
          </div>
        </a>
      </div>
      :
      <>
        {userID}
        <br />
        <input
          type="button"
          value='로그아웃'
          onClick={
            () => {
              window.sessionStorage.clear();
              setUserID('');
            }
          }
        />
      </>
  );
}


export default SocialLogin;