import { Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../styles/Slider/Slider.css'
import Swal from 'sweetalert2';

function GroupCloser(props) {
  const navigate = useNavigate();
  const [groupList, setGroupList] = useState({
    list: []
  });

  function getCloserGroupList() {
    axios
      .post('http://localhost:8088/nadoo/closerTrades', {
      })
      .then((res) => {
        const { data } = res;
        setGroupList({
          list: data.closerTrades
        });
      })
      .catch((e) => {
        console.error(e);
      })
  };

  useEffect(() => {
    getCloserGroupList();
  }, []);

  return (
    <Swiper
      // centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      // pagination={{
      //   clickable: true,
      // }}
      loop={true}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
      slidesPerView={2}
      slidesPerGroup={2}
      spaceBetween={-15}
      style={{
        backgroundColor: 'white',
        height: 200,
      }}
    >
      {
        groupList.list
          .map((item) => (
            <SwiperSlide key={item.tradeIdx}>
              {console.log(item.tradeIdx)}
              <div
                className="site-card-border-less-wrapper"
                onClick=
                {
                  () => {
                    if (window.sessionStorage.getItem('userID') === ''
                      || window.sessionStorage.getItem('userID') === undefined
                      || window.sessionStorage.getItem('userID') === null) {
                      Swal.fire('로그인 후 사용 가능한 서비스 입니다.');
                      return false;
                    }

                    if (item.diffTime === 0 || item.diffTime <= 0) {
                      Swal.fire('거래가 종료된 나두입니다.😢');
                      return false;
                    } else {
                      navigate(`/groupdetail/${item.tradeIdx}`, {
                        state: {
                          tradeIdx: item.tradeIdx
                        }
                      });
                    }
                  }
                }
              >
                <Card
                  title={item.tradeTitle}
                  bordered={false}
                  style=
                  {
                    item.diffTime === 0 || item.diffTime <= 0 ?
                      {
                        width: 180,
                        height: 150,
                        backgroundColor: 'whitesmoke',
                        color: 'red'
                      }
                      :
                      {
                        width: 180,
                        height: 150,
                        backgroundColor: 'white',
                      }
                  }
                >
                  {
                    item.diffTime === 0 || item.diffTime <= 0 ?
                      <span>
                        거래가 종료된
                        <br />
                        나두입니다.
                      </span>
                      :
                      <span>
                        {item.tradeProduct}
                        <br />
                        {item.tradeAddress}
                      </span>
                  }
                </Card>
              </div>
            </SwiperSlide>
          ))
      }
    </Swiper >
  );
}

export default GroupCloser;