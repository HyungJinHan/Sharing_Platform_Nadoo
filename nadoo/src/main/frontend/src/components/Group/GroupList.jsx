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

function GroupList(props) {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(false);
  const [groupList, setGroupList] = useState({
    list: []
  });

  function getGroupList() {
    axios
      .post('http://localhost:8088/nadoo/recentTrades', {
      })
      .then((res) => {
        const { data } = res;
        setGroupList({
          list: data.recentTrades
        });
      })
      .catch((e) => {
        console.error(e);
      })
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <>
      <GroupDiv>
        <List
          className='group_list'
          itemLayout="horizontal"
          pagination={{
            onChange: (page) => {
              console.log(page);
              setPageNum(!pageNum);
            },
            pageSize: 5,
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
                onClick=
                {
                  item.diffTime === 0 || item.diffTime <= 0 ?
                    () => {
                      Swal.fire('거래가 종료된 나두입니다.');
                      return false;
                    }
                    :
                    () => {
                      navigate(`/groupdetail/${item.tradeIdx}`, {
                        state: {
                          tradeIdx: item.tradeIdx
                        }
                      });
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
      <br />
      {
        pageNum === true ?
          <Button
            type="primary"
            onClick={
              () => {
                navigate('/grouplist');
              }
            }
          >
            목록 더보기
          </Button>
          :
          ''
      }
    </>
  );
}

export default GroupList;