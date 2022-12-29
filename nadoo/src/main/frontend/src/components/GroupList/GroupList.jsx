import { List } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const data = [
  {
    title: 'Ant Design Title 1',
    user: '한형진',
    item: '핸드크림',
    location: '광주 광산구',
  },
  {
    title: 'Ant Design Title 2',
    user: '백하늘',
    item: '딸기',
    location: '광주 북구',
  },
  {
    title: 'Ant Design Title 3',
    user: '배수진',
    item: '안경',
    location: '광주 동구',
  },
  {
    title: 'Ant Design Title 4',
    user: '민윤기',
    item: '커피',
    location: '광주 서구',
  },
  {
    title: 'Ant Design Title 5',
    user: '김유리',
    item: '폼클렌징',
    location: '광주 남구',
  },
  {
    title: 'Ant Design Title 6',
    user: '김민정',
    item: '모니터',
    location: '광주 광산구',
  },
];
function GroupList(props) {
  return (
    <List
      className='group_list'
      itemLayout="horizontal"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<Link to='/groupdetail'>{item.title}</Link>}
            description={[
              item.user, ' | ',
              item.item, ' | ',
              item.location
            ]}
          />
        </List.Item>
      )}
    />
  );
}

export default GroupList;