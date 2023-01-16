import { Button, List } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/Group/GroupList.css'
import Swal from 'sweetalert2';

const GroupDiv = styled.div`
  text-align: left;
`

function GroupListAll(props) {
  const navigate = useNavigate();
  const [groupList, setGroupList] = useState({
    list: []
  });

  function getAllGroupList() {
    axios
      .post('http://localhost:8088/nadoo/tradeAll', {
      })
      .then((res) => {
        const { data } = res;
        setGroupList({
          list: data.tradeAll
        });
      })
      .catch((e) => {
        console.error(e);
      })
  };

  useEffect(() => {
    getAllGroupList();
  }, []);

  return (
    <GroupDiv>
      <p className='GroupList_title'>
        👋 나두 목록 👋
        {/* 🚨⏰❗ */}
      </p>
      <List
        className='group_list'
        itemLayout="horizontal"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        dataSource={groupList.list}
        renderItem={(item) => (
          <List.Item
            style=
            {
              item.diffTime === 0 || item.diffTime <= 0 ?
                {
                  backgroundColor: 'whitesmoke',
                }
                :
                {
                  backgroundColor: 'white',
                }
            }
          >
            <List.Item.Meta
              style=
              {
                item.diffTime === 0 || item.diffTime <= 0 ?
                  {
                    color: 'red'
                  }
                  :
                  {
                    backgroundColor: 'white',
                  }
              }
              onClick=
              {
                () => {
                  if (window.sessionStorage.getItem('userID') === ''
                    || window.sessionStorage.getItem('userID') === undefined
                    || window.sessionStorage.getItem('userID') === null) {
                    Swal.fire('로그인 후 사용 가능한 서비스 입니다.');
                    return false;
                  }

                  if (item.diffTime === 0 || item.diffTime <= 0) {
                    Swal.fire('거래가 종료된 나두입니다.😢');
                    return false;
                  } else {
                    navigate(`/groupdetail/${item.tradeIdx}`, {
                      state: {
                        tradeIdx: item.tradeIdx
                      }
                    });
                  }
                }
              }
              title={item.tradeTitle}
              description=
              {
                item.diffTime === 0 || item.diffTime <= 0 ?
                  <span style={{ color: 'red' }}>
                    거래가 종료된 나두입니다.
                  </span>
                  :
                  [
                    item.userNick, ' | ',
                    item.tradeProduct, ' | ',
                    item.tradeAddress
                  ]
              }
            />
          </List.Item>
        )}
      />
      <br />
      <p className='GroupList_title'>
        <Button
          type="primary"
          onClick={
            () => {
              if (window.sessionStorage.getItem('userID') === '' ||
                window.sessionStorage.getItem('userID') === undefined ||
                window.sessionStorage.getItem('userID') === null) {
                Swal.fire('로그인 후 이용이 가능합니다.');
              } else {
                navigate('/groupcreate');
              }
            }
          }
        >
          나두 만들기
        </Button>
      </p>
    </GroupDiv>
  );
}

export default GroupListAll;