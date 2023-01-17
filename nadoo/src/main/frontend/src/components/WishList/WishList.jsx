import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { createPath } from 'react-router-dom';

const WishList = () => {
  const [heart, setheart] = useState();
  const [colorHeart, setColorHeart] = useState(false);

  return (
    <>
      <span className='heartIcon'
        onClick={
          () => {
            setColorHeart(!colorHeart);
          }
        }
      >
        {
          colorHeart === false ?
            <AiOutlineHeart
              style={{ color: 'red' }} />
            :
            <AiFillHeart
              style={{ color: 'red' }} />

        }
      </span>
    </>
  );
};

export default WishList;