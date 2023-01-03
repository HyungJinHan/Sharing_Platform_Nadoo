import { Divider, List } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const data = [
  '위시리스트',
  '공지사항',
  '고객센터',
  '구매목록',
];

function UserMyPageList(props) {
  const navigate = useNavigate();

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
          >
            {item}
          </List.Item>
        )}
      />
    </div>
  );
}

export default UserMyPageList;