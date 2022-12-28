import React, { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTop from '../Navigator/NavigatorTop';
import { Outlet, useLocation } from 'react-router-dom';


import "./Search.css";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff'
    }}
  />
);

const onSearch = (value) => console.log(value);


function SearchPage(props) {
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value)

  }



  return (
    <>
      <NavigatorTop />
      <Outlet />
      <div className='search'>
        <Space direction="vertical" className='search_box'>
          <Search placeholder="검색해보세요" onSearch={onSearch} enterButton />
        </Space>
      </div>



      <NavigatorMain />
      <Outlet />
    </>

  );
}

export default SearchPage;