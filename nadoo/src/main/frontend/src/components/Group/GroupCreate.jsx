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
          message="????????? ?????? ????????? ??????????????????!"
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
          message="????????? ?????? ??????????????? ??????????????????!"
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
          message="????????? ????????? ???????????????!"
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
          message="????????? ????????? ??????????????????!"
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
          message="????????? ????????? ????????? ???????????????!"
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
          message="????????? ????????? ???????????????!"
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
          message="????????? ????????? ????????? ???????????????!"
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
          message="????????? ????????? ????????? ???????????????!"
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
          message="????????? ????????? ???????????????!"
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
          message="????????? ?????? ???????????? ??????????????????!"
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

  /** ????????? ?????? */
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  /** ????????? ?????? */
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
          ???? ????????? ??????????????????! ????
          {/* ?????????? */}
        </p>
        <div className='GroupCreate_select'>
          <Select
            defaultValue="?????? ??????"
            style={{
              width: '48%',
              marginRight: '2%'
            }}
            options={[
              {
                value: '????????????',
                label: '?????? ??????',
              },
              {
                value: '????????????',
                label: '?????? ??????',
              }
            ]}
            onChange={
              (value) => {
                setGroupTradeType(value);
              }}
            ref={tradeTypeRef}
          />
          <Select
            defaultValue="???????????? ??????"
            style={{
              width: '48%',
              marginLeft: '2%'
            }}
            options={[
              {
                value: '1',
                label: '??????',
              },
              {
                value: '2',
                label: '?????????',
              },
              {
                value: '3',
                label: '?????????',
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
          placeholder="????????? ????????? ???????????? ??????????"
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
          placeholder="????????? ????????? ????????????????"
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
                placeholder="????????? ????????? ????????? ???????????????."
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
              '????????? ????????? ?????????!'
              :
              '????????? ???????????? ?????????!'
          }
        </Button>
        <br />
        <br />
        <Input
          placeholder="??? ?????? ????????? ?????? ????????????????"
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
            placeholder='????????? ???????????????.'
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
            placeholder='????????? ???????????????.'
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
          placeholder="????????? ????????? ??????????"
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
        {/* ?????? ?????? ?????? div */}
        <div id="popupDom">
          <br />
          {isPopupOpen && (
            <DaumAddressPopup>
              <div>
                <DaumPostcode onComplete={handlePostCode} />
                {/* ?????? ?????? ?????? */}
                <button
                  type="button"
                  onClick={() => {
                    closePostCode();
                  }}
                  className="GroupCreate_button"
                >
                  ??????
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
          placeholder="????????? ?????? ???????????? ??????????????????!"
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
          ?????? ?????????
        </Button>
      </CreateCenter>
      <NavigatorMain />
      <Outlet />
    </>
  );
}

export default GroupCreate;