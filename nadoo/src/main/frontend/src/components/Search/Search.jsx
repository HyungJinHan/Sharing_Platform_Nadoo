import React, { useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import NavigatorMain from '../Navigator/NavigatorMain';
import NavigatorTop from '../Navigator/NavigatorTop';
import { Outlet, useLocation } from 'react-router-dom';
import "../../styles/Search/Search.css";
import { Cascader } from 'antd';
import SearchList from './SearchList';
import axios from 'axios';
const { SHOW_CHILD } = Cascader;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff'
    }}
  />
);

const options = [
  {
    label: '광주광역시',
    value: '광주광역시 ',
    children: [
      {
        label: '광주광역시 광산구',
        value: '광산구',
      },
      {
        label: '광주광역시 동구',
        value: '동구',
      },
      {
        label: '광주광역시 서구',
        value: '서구',
      },
      {
        label: '광주광역시 남구',
        value: '남구',
      },
      {
        label: '광주광역시 북구',
        value: '북구',
      },
    ],
  },
  {
    label: '인천광역시',
    value: '인천광역시',
    children: [
      {
        label: '인천광역시 강화구',
        value: '강화구',
      },
      {
        label: '인천광역시 계양구',
        value: '계양구',
      },
      {
        label: '인천광역시 남동구',
        value: '남동구',
      },
      {
        label: '인천광역시 동구',
        value: '동구',
      },
      {
        label: '인천광역시 부평구',
        value: '부평구',
      },
      {
        label: '인천광역시 서구',
        value: '서구',
      },
      {
        label: '인천광역시 연수구',
        value: '연수구',
      },
      {
        label: '인천광역시 중구',
        value: '중구',
      },
    ],
  },
  {
    label: '대구광역시',
    value: '대구광역시 ',
    children: [
      {
        label: '대구광역시 남구',
        value: '남구',
      },
      {
        label: '대구광역시 달서구',
        value: '달서구',
      },
      {
        label: '대구광역시 동구',
        value: '동구',
      },
      {
        label: '대구광역시 북구',
        value: '북구',
      },
      {
        label: '대구광역시 서구',
        value: '서구',
      },
      {
        label: '대구광역시 수성구',
        value: '수성구',
      },
      {
        label: '대구광역시 중구',
        value: '중구',
      },
    ],
  },
  {
    label: '제주도',
    value: '제주도 ',
    children: [
      {
        label: '제주도 서귀포시',
        value: '서귀포시',
      },
      {
        label: '제주도 제주시',
        value: '제주시',
      },
    ],
  },
  {
    label: '대전광역시',
    value: '대전광역시 ',
    children: [
      {
        label: '대전광역시 대덕구',
        value: '대덕구',
      },
      {
        label: '대전광역시 동구',
        value: '동구',
      },
      {
        label: '대전광역시 서구',
        value: '서구',
      },
      {
        label: '대전광역시 유성구',
        value: '유성구',
      },
      {
        label: '대전광역시 중구',
        value: '중구',
      },
    ],
  },
  {
    label: '울산광역시',
    value: '울산광역시 ',
    children: [
      {
        label: '울산광역시 남구',
        value: '남구',
      },
      {
        label: '울산광역시 동구',
        value: '동구',
      },
      {
        label: '울산광역시 북구',
        value: '북구',
      },
      {
        label: '울산광역시 울주군',
        value: '울주군',
      },
      {
        label: '울산광역시 중구',
        value: '중구',
      },
    ],
  },
];

const onSearch = (value) => console.log(value);




function SearchPage({
  test,
  setTest,
  url
}) {
  const [mode, setMode] = useState(0);

  const [search, setSearch] = useState("");

  console.log(mode);

  const onChange = (value) => {
    console.log(value);
  };

  const [product, setProduct] = useState({
    list: []
  });

  const getProduct = () => {
    axios
      .post('http://localhost:8088/nadoo/tradeAll', {
      })
      .then((res) => {
        const { data } = res;
        setProduct({
          list: data.tradeAll
        })
      })
      .catch((e) => {
        console.log(e);
      })
  }

  // useEffect(
  //   () => {
  //     getProduct();
  //   }
  //   , []);

  if (mode === 0) {
    return (
      <>
        <div className='search'>
          {test}
          {url}
          <Space direction="vertical" className='search_box'>
            <Search
              placeholder="검색해보세요"
              onSearch={onSearch}
              enterButton
              onKeyPress={
                (e) => {
                  if (e.key === 'Enter') {
                    getProduct();
                    setTest('Child');
                  }
                }
              } />
          </Space>
          <br />
          <br />

          <Cascader
            style={{
              width: '80%',
            }}
            options={options}
            onChange={onChange}
            multiple
            maxTagCount="responsive"
            showCheckedStrategy={SHOW_CHILD}
          />
          <SearchList productList={getProduct} />
          {
            product.list
              .map(
                (item) => (
                  item.tradeProduct
                )
              )
          }
        </div>
        <input type="button" onClick={
          () => { setMode(1) }
        } />
      </>
    );
  }
  if (mode === 1) {
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
        이건 모드 1
      </div>
    );
  }
}

export default SearchPage;