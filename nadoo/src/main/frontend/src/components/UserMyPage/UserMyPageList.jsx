import { Divider, List } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const data = [
  '공지사항',
  '고객센터',
  '구매목록',
  '위시리스트',
];

function UserMyPageList(props) {
  const navigate = useNavigate();

  return (
    <div>
      <Divider orientation="left" >마이페이지</Divider>
      <List
        style={{
          display: "block"
        }}
        size="large"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            onClick={
              () => {
                if (window.sessionStorage.getItem('userID') === '' ||
                  window.sessionStorage.getItem('userID') === undefined ||
                  window.sessionStorage.getItem('userID') === null) {
                  Swal.fire('로그인 후 이용이 가능합니다.');
                  return false;
                } else {
                  if (item === '위시리스트') {
                    navigate('/wishlist');
                  } else if (item === '공지사항') {
                    navigate('/notice');
                  } else if (item === '고객센터') {
                    navigate('/customer');
                  } else if (item === '구매목록') {
                    navigate('/purchased');
                  }
                }
              }
            }
          >
            {item}
          </List.Item>
        )}
      />
    </div>
  );
}

export default UserMyPageList;