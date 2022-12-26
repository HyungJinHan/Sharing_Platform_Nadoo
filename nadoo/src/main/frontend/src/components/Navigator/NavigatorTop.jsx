import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../../styles/Navigator/NavigatorTop.css'
import styled from "styled-components";
import Logo from '../../static/HHJ/images/NADOO.svg'

const NavCenter = styled.div`
  text-align: center;
  padding-top: 5.625rem;
`;

function NavigatorTop(props) {
  const navigate = useNavigate();

  return (
    <NavCenter>
      <div className="Navigator_topbar">
        <img
          src={Logo}
          alt="undefind"
          onClick={
            () => {
              navigate('/main');
            }
          }
        />
      </div>
    </NavCenter>
  );
}

export default NavigatorTop;