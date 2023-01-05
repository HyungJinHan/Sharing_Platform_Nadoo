import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SoicalLoginNaverConfirm(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const NAVER_CODE = location.search.split('&')[0].split('=')[1];
  const NAVER_STATE = "12345";
  console.log(NAVER_CODE);

  const [loginAccount, setLoginAccount] = useState({});

  const getNaverToken = () => {
    axios
        .get(`http://localhost:8088/login/naver?code=${NAVER_CODE}&state=${NAVER_STATE}`, {
        })
        .then((res) => {
            const { data } = res;
            setLoginAccount(data.userInfo);
            console.log(res.data);
        })
        .catch((e) => {
          console.error(e);
        })
  }

  useEffect(() => {
    getNaverToken();
  }, []);

  return (
    <div>
      {loginAccount.userAccount}
      <br />
      {loginAccount.userNick}
      <br />
      {loginAccount.userHp}
    </div>
  );
}

export default SoicalLoginNaverConfirm;