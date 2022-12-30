import { Button, List } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/GroupList/GroupList.css'

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
      <p className='Test_endSoon'>
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
          <List.Item>
            <List.Item.Meta
              onClick={
                () => {
                  navigate(`/groupdetail/${item.tradeIdx}`, {
                    state: {
                      tradeIdx: item.tradeIdx
                    }
                  });
                }
              }
              title={item.tradeTitle}
              description={[
                item.userNick, ' | ',
                item.tradeProduct, ' | ',
                item.tradeAddress
              ]}
            />
          </List.Item>
        )}
      />
      <br />
      <p className='Test_endSoon'>
        <Button
          type="primary"
          onClick={
            () => {
              navigate('/grouplist');
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