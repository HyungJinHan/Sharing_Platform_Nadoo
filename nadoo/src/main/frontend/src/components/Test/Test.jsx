import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Test() {
  const location = useLocation();

  console.log(location.pathname);

  const [hello, setHello] = useState({
    list: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/nadoo')
      .then((res) => {
        const { data } = res;
        setHello({
          list: data
        });
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <div>
      {
        hello.list
          .map((list) => (
            <div key={list.userId}>
              백엔드에서 가져온 데이터입니다 : {list.userId} / {list.userName} /{list.userAddress} / {list.userHp}
              <br />
            </div>
          ))
      }
      <input
        type='button'
        value='main으로'
        onClick={
          () => {
            navigate('/main');
          }
        }
      />
      <input
        type='button'
        value='test로'
        onClick={
          () => {
            navigate('/test');
          }
        }
      />
    </div>
  );
}

export default Test;