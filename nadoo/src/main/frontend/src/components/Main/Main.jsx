import React from 'react';
import { useLocation } from 'react-router-dom';
import { BiSearch, BiHomeAlt } from 'react-icons/bi';
import '../../styles/Main/Main.css'

function Main(props) {
  const location = useLocation();
  const url = location.pathname
  console.log(location.pathname);

  if (url === '/test') {
    return (
      <div>
        Hello
        <BiSearch
          className='testIcon'
        />
        <BiHomeAlt
          className='testIcon'
        />
      </div>
    );
  } else {
    return (
      <div>
        Bye
      </div>
    );
  }
}

export default Main;