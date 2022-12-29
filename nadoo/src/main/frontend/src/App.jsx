import "./App.css";
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import NavigatorMain from './components/Navigator/NavigatorMain';
import NavigatorTop from "./components/Navigator/NavigatorTop";
import SearchPage from "./components/Search/Search";
import GroupDetail from "./components/GroupDetail/GroupDetail";
import axios from "axios";

function App() {
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
    <Routes>
      {/* 테스트용 컴포넌트 */}
      <Route path='/' element={<Main />} />
      {/* 유저 화면 컴포넌트 */}
      <Route path='/test' element={<Main />} />
      <Route path='/mypage' element={<Main />} />
      <Route path='/wish' element={<Main />} />
      <Route path="/navigator" element={<NavigatorMain />} />
      <Route path="/navigatortop" element={<NavigatorTop />} />
      <Route path="/search" element={<SearchPage />} />
      {
        groupList.list
          .map((idx) => (
            <Route path={`/groupdetail/${idx.tradeIdx}`} element={< GroupDetail />} />
          ))
      }
    </Routes>
  );
}

export default App;