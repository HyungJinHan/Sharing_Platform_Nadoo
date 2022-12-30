import { Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../styles/Slider/Slider.css'

function SliderGroup(props) {
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
            <SwiperSlide>
              {console.log(item.tradeIdx)}
              <div
                className="site-card-border-less-wrapper"
                onClick={
                  () => {
                    navigate(`/groupdetail/${item.tradeIdx}`, {
                      state: {
                        tradeIdx: item.tradeIdx
                      }
                    });
                  }
                }
              >
                <Card
                  title={item.tradeTitle}
                  bordered={false}
                  style={{
                    width: 180,
                    height: 180,
                    backgroundColor: 'white',
                  }}
                >
                  <p>{item.userNick} | {item.tradeProduct}</p>
                  <p>{item.tradeAddress}</p>
                </Card>
              </div>
            </SwiperSlide>
          ))
      }
    </Swiper >
  );
}

export default SliderGroup;