import { List } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
      .post('http://localhost:8088/nadoo/tradesAll', {
      })
      .then((res) => {
        const { data } = res;
        setGroupList({
          list: data.tradesAll
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
      <List
        className='group_list'
        itemLayout="horizontal"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
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
    </GroupDiv>
  );
}

export default GroupListAll;