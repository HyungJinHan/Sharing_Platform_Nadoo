import { Input } from 'antd';
import React from 'react';
import { BiPaperPlane } from 'react-icons/bi';
import styled from 'styled-components';
import '../../styles/Navigator/Navigator.css'

const NavCenter = styled.div`
  text-align: center;
  padding-top: 5.625rem;
`;

function NavigatorChat({
  sendValue,
  message,
  handleMessage
}) {
  return (
    <NavCenter>
      <div className="Navigator_bar">
        <div className="send-message">
          <Input
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendValue();
              }
            }}
            placeholder="메세지를 입력하세요!"
            value={message}
            onChange={handleMessage}
            bordered={false}
            className='Navigator_chatInput'
          />
          <button
            type="button"
            onClick={sendValue}
            className='Navigator_chatButton'
          >
            <BiPaperPlane
              style={
                { fontSize: '30px' }
              }
            />
          </button>
        </div>
      </div>
    </NavCenter>
  );
}

export default NavigatorChat;