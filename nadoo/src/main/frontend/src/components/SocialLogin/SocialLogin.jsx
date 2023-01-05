import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from './SocialLoginOAuth';

function SocialLogin(props) {

  return (
    <div>
      <a href={KAKAO_AUTH_URL}>
        <span>카카오계정 로그인</span>
      </a><br/>
      <a href={NAVER_AUTH_URL}>
        <span>네이버계정 로그인</span>
      </a>
    </div>
  );
}

export default SocialLogin;