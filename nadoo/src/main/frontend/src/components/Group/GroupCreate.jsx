import React, { useRef, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import '../../styles/Group/GroupCreate.css'
import DaumPostcode from "react-daum-postcode";
import DaumAddressPopup from './DaumPostCode/DaumAddressPopup';
import NavigatorTop from '../Navigator/NavigatorTop';
import { Outlet } from 'react-router-dom';
import NavigatorMain from '../Navigator/NavigatorMain';
import TextArea from 'antd/es/input/TextArea';
import styled from 'styled-components';

const CreateCenter = styled.div`
  text-align: center;
`

function GroupCreate(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userAddr, setUserAddr] = useState('');
  const addressRef = useRef();

  /** 팝업창 열기 */
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  /** 팝업창 닫기 */
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    addressRef.current.value = fullAddress;
    setUserAddr(fullAddress);
    closePostCode();
  };

  return (
    <>
      <NavigatorTop />
      <Outlet />
      <CreateCenter>
        <p className='GroupCreate_title'>
          👋 나두를 생성해보세요! 👋
          {/* 🚨⏰❗ */}
        </p>
        <Input
          placeholder="나두의 이름은 무엇으로 할까요?"
          style={{
            width: '90%'
          }}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        <br />
        <br />
        <Input
          placeholder="위치는 어디로 할까요?"
          style={{
            width: '90%'
          }}
          ref={addressRef}
          onClick={() => {
            openPostCode();
            addressRef.current.value = '';
          }}
          onChange={() => {
            openPostCode();
            setUserAddr(addressRef.current.value);
          }}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
        {/* 팝업 생성 기준 div */}
        <div id="popupDom">
          <br />
          {isPopupOpen && (
            <DaumAddressPopup>
              <div>
                <DaumPostcode onComplete={handlePostCode} />
                {/* 닫기 버튼 생성 */}
                <button
                  type="button"
                  onClick={() => {
                    closePostCode();
                  }}
                  className="GroupCreate_button"
                >
                  닫기
                </button>
              </div>
            </DaumAddressPopup>
          )}
        </div>
        <TextArea
          placeholder="전하고 싶은 메시지를 작성해주세요!"
          allowClear
          showCount
          maxLength={200}
          style={{
            resize: 'none',
            width: '90%'
          }}
        />
      </CreateCenter>
      <NavigatorMain />
      <Outlet />
    </>
  );
}

export default GroupCreate;