import { List } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const GroupDiv = styled.div`
  text-align: left;
`

function GroupChatList(props) {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(false);
  const [chatArticle, setChatArticle] = useState({
    list: []
  });

  function getChatList() {
    axios
      .post('http://localhost:8088/nadoo/chatlist', {
        userId: window.sessionStorage.getItem('userID')
      })
      .then((res) => {
        const { data } = res;
        setChatArticle({
          list: data
        });
      })
      .catch((e) => {
        console.error(e);
      })
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <>
      <GroupDiv>
        <List
          className='group_list'
          itemLayout="horizontal"
          pagination={{
            onChange: (page) => {
              setPageNum(!pageNum);
            },
            pageSize: 5,
          }}
          dataSource={chatArticle.list}
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
                    ]}
              />
            </List.Item>
          )}
        />
      </GroupDiv>
    </>
  );
}

export default GroupChatList;