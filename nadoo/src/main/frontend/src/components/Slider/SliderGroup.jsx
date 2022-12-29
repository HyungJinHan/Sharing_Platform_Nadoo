import { Card } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../styles/Slider/Slider.css'

const data = [
  {
    title: 'Ant Design Title 1',
    user: '한형진',
    item: '핸드크림',
    location: '광주 광산구',
  },
  {
    title: 'Ant Design Title 2',
    user: '백하늘',
    item: '딸기',
    location: '광주 북구',
  },
  {
    title: 'Ant Design Title 3',
    user: '배수진',
    item: '안경',
    location: '광주 동구',
  },
  {
    title: 'Ant Design Title 4',
    user: '민윤기',
    item: '커피',
    location: '광주 서구',
  },
  {
    title: 'Ant Design Title 5',
    user: '김유리',
    item: '폼클렌징',
    location: '광주 남구',
  },
  {
    title: 'Ant Design Title 6',
    user: '김민정',
    item: '모니터',
    location: '광주 광산구',
  },
];

function SliderGroup(props) {
  const navigate = useNavigate();

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
        data.map((item) => (
          <SwiperSlide>
            <div
              className="site-card-border-less-wrapper"
              onClick={
                () => {
                  navigate('/groupdetail');
                }
              }
            >
              <Card
                title={'Card Title'}
                bordered={false}
                style={{
                  width: 180,
                  height: 180,
                  backgroundColor: 'white',
                }}
              >
                <p>{item.user} | {item.item}</p>
                <p>{item.location}</p>
              </Card>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

export default SliderGroup;