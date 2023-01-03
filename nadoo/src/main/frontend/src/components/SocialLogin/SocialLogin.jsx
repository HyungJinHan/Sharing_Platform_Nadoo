import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL } from './SocialLoginOAuth';

function SocialLogin(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split('=')[1];
  console.log(KAKAO_CODE);

  useEffect(() => {
    axios
      .get('http://localhost:8088/nadoo/closerTrades', {
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        navigate('/')
      })
      .catch((e) => {
        console.error(e);
      })
  })

  return (
    <div>
      <a href={KAKAO_AUTH_URL}>
        <span>카카오계정 로그인</span>
      </a>
    </div>
  );
}

export default SocialLogin;