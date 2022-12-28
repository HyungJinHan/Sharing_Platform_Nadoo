import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../styles/Slider/Slider.css";

import Slider1 from '../../static/HHJ/images/Slider1.png';
import Slider2 from '../../static/HHJ/images/Slider2.png';
import Slider3 from '../../static/HHJ/images/Slider3.png';
import Slider4 from '../../static/HHJ/images/Slider4.png';

// import required modules
import { Autoplay, Pagination } from "swiper";
import axios from 'axios';

function Slider(props) {
  const [hello, setHello] = useState({
    list: []
  });

  useEffect(() => {
    axios
      .get('/nadoo')
      .then((res) => {
        const { data } = res;
        setHello({
          list: data
        });
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {/* {
          hello.list
            .map((list) => (
              <SwiperSlide key={list.userId}>
                userId : {list.userId}
                <br />
                userName : {list.userName}
                <br />
                userAddress: {list.userAddress}
                <br />
                userHp : {list.userHp}
                <br />
                <br />
                <br />
              </SwiperSlide>
            ))
        } */}
        <SwiperSlide><img src={Slider1} alt="!" /></SwiperSlide>
        <SwiperSlide><img src={Slider2} alt="!" /></SwiperSlide>
        <SwiperSlide><img src={Slider3} alt="!" /></SwiperSlide>
        <SwiperSlide><img src={Slider4} alt="!" /></SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;