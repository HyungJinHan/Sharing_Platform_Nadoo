import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Test from './components/Test/Test';
import Main from './components/Main/Main';

function App() {

  return (
    <Routes>
      {/* 테스트용 컴포넌트 */}
      <Route path='/' element={<Test />} />
      {/* 유저 화면 컴포넌트 */}
      <Route path='/main' element={<Main />} />
      <Route path='/test' element={<Main />} />
    </Routes>
  );
}

export default App;