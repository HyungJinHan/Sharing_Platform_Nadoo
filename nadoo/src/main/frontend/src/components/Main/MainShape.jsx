import React from 'react';
import '../../styles/Main/Main.css';
import Slider from '../Slider/Slider';
import day from '../../static/HHJ/images/Group 40.svg';
import recycle from '../../static/HHJ/images/Group 43.svg';
import together from '../../static/HHJ/images/Group 45.svg';
import mega from '../../static/HHJ/images/Group 47.svg';
import GroupList from '../Group/GroupList';
import GroupCloser from '../Group/GroupCloser';

function MainShape() {
  return (
    <div>
      <div className='Main_guideImg'>
        <div>
          <Slider />
        </div>
        <br />
        <div className='Main_iconDiv'>
          <div className='Main_iconIfo'>
            <img
              className='Main_icon'
              alt='undefind'
              src={together}
            />
            <br />
            <p className='Main_iconText'>나두 일정</p>
          </div>
          <div className='Main_iconIfo'>
            <img
              className='Main_icon'
              alt='undefind'
              src={recycle}
            />
            <br />
            <p className='Main_iconText'>나두 교환</p>
          </div>
          <div className='Main_iconIfo'>
            <img
              className='Main_icon'
              alt='undefind'
              src={mega}
            />
            <br />
            <p className='Main_iconText'>나두 함께</p>
          </div>
          <div className='Main_iconIfo'>
            <img
              className='Main_icon'
              alt='undefind'
              src={day}
            />
            <br />
            <p className='Main_iconText'>나두 공지</p>
          </div>
        </div>
        <br />
        <br />
        <span className='Main_endSoon'>
          ⏰ 종료 임박 ⏰
          {/* 🚨⏰❗ */}
        </span>
        <br />
        <br />
      </div>
      <GroupCloser />
      <div className='Main_guideImg'>
        <span className='Main_endSoon'>
          👋 최신 나두 👋
          {/* 🚨⏰❗ */}
        </span>
        <br />
        <br />
        <GroupList />
      </div>
    </div>
  );
}

export default MainShape;