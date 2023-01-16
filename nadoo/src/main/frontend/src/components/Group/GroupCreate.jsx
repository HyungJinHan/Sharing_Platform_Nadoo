import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, DatePicker, Input, Select, TimePicker } from 'antd';
import '../../styles/Group/GroupCreate.css'
import DaumPostcode from "react-daum-postcode";
import DaumAddressPopup from './DaumPostCode/DaumAddressPopup';
import NavigatorTop from '../Navigator/NavigatorTop';
import { Outlet, useNavigate } from 'react-router-dom';
import NavigatorMain from '../Navigator/NavigatorMain';
import TextArea from 'antd/es/input/TextArea';
import styled from 'styled-components';
import { GrLocation } from 'react-icons/gr';
import { BiCart, BiHighlight, BiUser } from 'react-icons/bi'
import { MdAttachMoney } from 'react-icons/md';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const format = 'HH:mm';
const { RangePicker } = DatePicker;

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};
const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});
const disabledRangeTime = (_, type) => {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

const CreateCenter = styled.div`
  text-align: center;
`

function GroupCreate({
  getGroupList
}) {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [priceToggle, setPriceToggle] = useState(false);

  const [groupTitle, setGroupTitle] = useState('');
  const [groupUser, setGroupUser] = useState(window.sessionStorage.getItem(`userID`));
  const [groupLocation, setGroupLocation] = useState('');
  const [groupArticle, setGroupArticle] = useState('');
  const [groupDate, setGroupDate] = useState('');
  const [groupTime, setGroupTime] = useState('');
  const [groupPrice, setGroupPrice] = useState();
  const [groupMax, setGroupMax] = useState();
  const [groupCategory, setGroupCategory] = useState();
  const [groupTradeType, setGroupTradeType] = useState('');
  const [groupProduct, setGroupProduct] = useState('');

  const titleRef = useRef();
  const locationRef = useRef();
  const articleRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const priceRef = useRef();
  const maxRef = useRef();
  const categoryRef = useRef();
  const tradeTypeRef = useRef('');
  const productRef = useRef('');

  console.log(
    typeof (groupTitle), '/',
    typeof (groupUser), '/',
    typeof (groupLocation), '/',
    typeof (groupArticle), '/',
    typeof (groupDate), '/',
    typeof (groupTime), '/',
    typeof (groupPrice), '/',
    typeof (groupCategory), '/',
    typeof (groupTradeType), '/',
    typeof (groupProduct), '/',
    typeof (groupMax)
  );

  console.log(
    groupTitle, '/',
    groupUser, '/',
    groupLocation, '/',
    groupArticle, '/',
    groupDate, '/',
    groupTime, '/',
    groupPrice, '/',
    groupCategory, '/',
    groupTradeType, '/',
    groupProduct, '/',
    groupMax
  );

  console.log(priceToggle);

  function createGroup() {
    axios
      .post('http://localhost:8088/nadoo/createTrade', {
        tradeTitle: groupTitle,
        tradeAddress: groupLocation,
        tradeContent: groupArticle,
        userAccount: groupUser,
        tradeEndtime: groupDate + ' ' + groupTime,
        tradePrice: `${groupPrice}`,
        tradeMax: groupMax,
        tradeType: groupTradeType,
        categoryIdx: groupCategory,
        tradeProduct: groupProduct
      })
      .then(
        async (res) => {
          await getGroupList();
          await navigate('/grouplist');
        })
      .catch((e) => {
        console.error(e);
      })
  };

  const errorCheck = () => {
    if (groupTradeType === '' || groupTradeType === undefined) {
      setErrorMessage(
        <Alert
          message="나두의 거래 종류를 선택해주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      tradeTypeRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
      categoryRef.current.focus();
    }

    if (groupCategory === null || groupCategory === undefined) {
      setErrorMessage(
        <Alert
          message="나두의 거래 카테고리를 선택해주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      categoryRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
      titleRef.current.focus();
    }

    if (groupTitle === '' || groupTitle === undefined) {
      setErrorMessage(
        <Alert
          message="나두의 제목을 지어주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      titleRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
      productRef.current.focus();
    }

    if (groupProduct === '' || groupProduct === undefined) {
      setErrorMessage(
        <Alert
          message="판매할 물품을 작성해주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      productRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
      if (priceToggle === false) {
        priceRef.current.focus();
      }
    }

    if ((groupPrice === '' || groupPrice === undefined) && priceToggle === false) {
      setErrorMessage(
        <Alert
          message="판매할 물품의 가격을 적어주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      priceRef.current.focus();
      return false;
    } else if (groupPrice === 0) {
      setErrorMessage("");
      locationRef.current.focus();
    }

    if (groupMax === '' || groupMax === undefined) {
      setErrorMessage(
        <Alert
          message="거래할 인원을 정해주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      maxRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
      dateRef.current.focus();
    }

    if (groupDate === '' || groupDate === undefined) {
      setErrorMessage(
        <Alert
          message="나두가 끝나는 날짜를 정해주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      dateRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
      timeRef.current.focus();
    }

    if (groupTime === '' || groupTime === undefined) {
      setErrorMessage(
        <Alert
          message="나두가 끝나는 시간을 정해주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      timeRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
      locationRef.current.focus();
    }

    if (groupLocation === '' || groupLocation === undefined) {
      setErrorMessage(
        <Alert
          message="나두의 위치를 알려주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      locationRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
      articleRef.current.focus();
    }

    if (groupArticle === '' || groupArticle === undefined) {
      setErrorMessage(
        <Alert
          message="전하고 싶은 메세지를 작성해주세요!"
          type="error"
          showIcon
          style={{
            width: '90%',
            margin: `0 auto`
          }}
        />
      );
      articleRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
    }

    createGroup();
  }

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
    locationRef.current.value = fullAddress;
    setGroupLocation(fullAddress);
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
        <div className='GroupCreate_select'>
          <Select
            defaultValue="거래 종류"
            style={{
              width: '48%',
              marginRight: '2%'
            }}
            options={[
              {
                value: '일반거래',
                label: '일반 거래',
              },
              {
                value: '번개거래',
                label: '번개 거래',
              }
            ]}
            onChange={
              (value) => {
                setGroupTradeType(value);
              }}
            ref={tradeTypeRef}
          />
          <Select
            defaultValue="카테고리 선택"
            style={{
              width: '48%',
              marginLeft: '2%'
            }}
            options={[
              {
                value: '1',
                label: '뷰티',
              },
              {
                value: '2',
                label: '식료품',
              },
              {
                value: '3',
                label: '생필품',
              }
            ]}
            onChange={
              (value) => {
                setGroupCategory(value);
              }}
            ref={categoryRef}
          />
        </div>
        <br />
        <br />
        <Input
          placeholder="나두의 이름은 무엇으로 할까요?"
          style={{
            width: '90%'
          }}
          prefix={<BiHighlight className="site-form-item-icon" />}
          ref={titleRef}
          onChange={(e) => {
            setGroupTitle(e.target.value);
          }}
        />
        <br />
        <br />
        <Input
          placeholder="판매할 물품은 무엇인가요?"
          style={{
            width: '90%'
          }}
          prefix={<BiCart className="site-form-item-icon" />}
          ref={productRef}
          onChange={(e) => {
            setGroupProduct(e.target.value);
          }}
        />
        {
          priceToggle === true ?
            ''
            :
            <>
              <br />
              <br />
              <Input
                type='number'
                placeholder="판매할 물품의 가격을 매겨주세요."
                style={{
                  width: '90%'
                }}
                prefix={<MdAttachMoney className="site-form-item-icon" />}
                ref={priceRef}
                onChange={(e) => {
                  setGroupPrice(e.target.value);
                }}
              />
            </>
        }
        <br />
        <br />
        <Button
          style={{
            width: '90%'
          }}
          type="dashed"
          onClick={
            () => {
              setPriceToggle(!priceToggle);
              if (priceToggle === false) {
                setGroupPrice(0);
              } else if (priceToggle === true) {
                setGroupPrice('');
              }
            }
          }
        >
          {
            priceToggle === true ?
              '가격을 정하고 싶어요!'
              :
              '만나서 결정하고 싶어요!'
          }
        </Button>
        <br />
        <br />
        <Input
          placeholder="몇 명과 거래를 하고 싶으신가요?"
          type='number'
          style={{
            width: '90%'
          }}
          prefix={<BiUser className="site-form-item-icon" />}
          ref={maxRef}
          onChange={(e) => {
            setGroupMax(e.target.value);
          }}
        />
        <br />
        <br />
        <div className='GroupCreate_select'>
          <DatePicker
            placeholder='날짜를 정해주세요.'
            style={{
              width: '48%',
              marginRight: '2%'
            }}
            onChange={
              (date, dateString) => {
                setGroupDate(dateString);
              }}
            size="large"
            ref={dateRef}
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{
              defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
            }}
          />
          <TimePicker
            style={{
              width: '48%',
              marginLeft: '2%'
            }}
            placeholder='시간을 정해주세요.'
            format={format}
            size="large"
            onChange={
              (time, timeSting) => {
                setGroupTime(timeSting);
              }
            }
            ref={timeRef}
          />
        </div>
        <br />
        <br />
        <Input
          type="text"
          placeholder="위치는 어디로 할까요?"
          style={{
            width: '90%'
          }}
          ref={locationRef}
          value={groupLocation}
          onClick={() => {
            openPostCode();
            locationRef.current.value = '';
          }}
          onChange={() => {
            openPostCode();
            setGroupLocation(locationRef.current.value);
          }}
          prefix={<GrLocation className="site-form-item-icon" />}
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
          showCount
          maxLength={200}
          style={{
            height: 160,
            resize: 'none',
            width: '90%'
          }}
          placeholder="전하고 싶은 메시지를 작성해주세요!"
          ref={articleRef}
          onChange={(e) => {
            setGroupArticle(e.target.value);
          }}
        />
        <br />
        <br />
        {errorMessage}
        <br />
        <Button
          type="primary"
          onClick={
            () => {
              errorCheck();
            }
          }
        >
          나두 만들기
        </Button>
      </CreateCenter>
      <NavigatorMain />
      <Outlet />
    </>
  );
}

export default GroupCreate;