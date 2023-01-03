import React from 'react';
import { useLocation } from 'react-router-dom';
import { KAKAO_AUTH_URL } from './SocialLoginOAuth';

function SocialLogin(props) {
  let kakaoUrl = new URL(window.location.href).searchParams.get('code');
  console.log(window.location.href);
  console.log(kakaoUrl);

  return (
    <div>
      <a href={KAKAO_AUTH_URL}>
        <span>카카오계정 로그인</span>
      </a>
    </div>
  );
}

export default SocialLogin;