import "./App.css";
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import NavigatorMain from './components/Navigator/NavigatorMain';
import NavigatorTop from "./components/Navigator/NavigatorTop";
import SearchPage from "./components/Search/Search";
import axios from "axios";
import GroupCreate from "./components/Group/GroupCreate";
import GroupDetail from "./components/Group/GroupDetail";
import UserMyPage from "./components/UserMyPage/UserMyPage";
import SocialLogin from "./components/SocialLogin/SocialLogin";

function App() {
  const [groupList, setGroupList] = useState({
    list: []
  });

  function getGroupList() {
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
    getGroupList();
  }, []);

  return (
    <Routes>
      {/* 테스트용 컴포넌트 */}
      <Route path='/' element={<Main />} />

      {/* 마이 페이지 */}
      <Route path='/mypage' element={<Main />} />

      {/* 최신 나두 불러오기 */}
      <Route path='/grouplist' element={<Main />} />

      {/* 검색 페이지 */}
      <Route path="/search" element={<Main />} />

      {/* 마이 페이지 */}
      <Route path='/wishlist' element={<UserMyPage />} />

      {/* 마이 페이지 */}
      <Route path='/notice' element={<UserMyPage />} />

      {/* 마이 페이지 */}
      <Route path='/customer' element={<UserMyPage />} />

      {/* 마이 페이지 */}
      <Route path='/purchased' element={<UserMyPage />} />

      {/* 하단 네비게이션 */}
      <Route path="/navigator" element={<NavigatorMain />} />

      {/* 상단 헤더 */}
      <Route path="/navigatortop" element={<NavigatorTop />} />

      {/* 방 생성 */}
      <Route path="/groupcreate" element={<GroupCreate />} />

      {/* 소셜로그인 (카카오) */}
      <Route path="/kakaologin" element={<SocialLogin />} />
      
      {/* 해당 그룹 상세정보 페이지 */}
      {groupList.list
        .map((item) => (
          <Route
            key={item.tradeIdx}
            path={`/groupdetail/${item.tradeIdx}`}
            element={<GroupDetail />}
          />
        ))}
    </Routes>
  );
}

export default App;